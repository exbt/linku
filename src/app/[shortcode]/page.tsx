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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white font-sans">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Not Found</h1>
        <p className="text-gray-400">This link does not exist or has been deleted.</p>
        <a 
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors text-white font-medium"
        >
          Go Home
        </a>
      </div>
    );
  }

  await prisma.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.originalUrl);
}