import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ shortcode: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortcode } = await params;

  const link = await prisma.link.findUnique({
    where: { shortCode: shortcode },
  });

  if (!link) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl">404 - Link Not Found</h1>
      </div>
    );
  }

  await prisma.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.originalUrl);
}