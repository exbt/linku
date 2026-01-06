'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

export async function createLink(formData: FormData) {
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
    }
  });

  revalidatePath("/");
}