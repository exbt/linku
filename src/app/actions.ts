'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

async function getUrlTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkuBot/1.0)' } 
    });
    
    const html = await response.text();
    
    const match = html.match(/<title>(.*?)<\/title>/i);
    
    return match && match[1] ? match[1] : url;
  } catch (error) {
    console.error("Title fetch error:", error);
    return url; 
  }
}

export async function createLink(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const originalUrl = formData.get("url") as string;
  let finalUrl = originalUrl;
  
  if (!finalUrl.startsWith('http')) {
    finalUrl = 'https://' + finalUrl;
  }


  const pageTitle = await getUrlTitle(finalUrl);


  const shortCode = generateShortCode();

  await prisma.link.create({
    data: {
      originalUrl: finalUrl,
      shortCode: shortCode,
      userId: userId,
      title: pageTitle, 
    }
  });

  revalidatePath("/");
}

export async function deleteLink(linkId: string) {
    const { userId } = await auth();
    if (!userId) return;
    const link = await prisma.link.findUnique({ where: { id: linkId } });
    if (!link || link.userId !== userId) throw new Error("Unauthorized");
    await prisma.link.delete({ where: { id: linkId } });
    revalidatePath("/");
}