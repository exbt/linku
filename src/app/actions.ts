'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server"; 

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

export async function createLink(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const originalUrl = formData.get("url") as string;
  let finalUrl = originalUrl;
  if (!finalUrl.startsWith('http')) {
    finalUrl = 'https://' + finalUrl;
  }

  const shortCode = generateShortCode();

  await prisma.link.create({
    data: {
      originalUrl: finalUrl,
      shortCode: shortCode,
      userId: userId, 
    }
  });

}

export async function deleteLink(linkId: string) {
  const { userId } = await auth();

  if (!userId) return;

  const link = await prisma.link.findUnique({
    where: { id: linkId }
  });

  if (!link || link.userId !== userId) {
    throw new Error("Unauthorized action!");
  }

  await prisma.link.delete({
    where: { id: linkId }
  });


  revalidatePath("/");
}