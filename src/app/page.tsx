import { prisma } from "@/lib/db";
import { createLink } from "./actions";
import CopyButton from "@/components/CopyButton";
import QrButton from "@/components/QrButton";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4 font-sans">
      <div className="w-full max-w-lg space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tighter bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Linku
          </h1>
          <p className="text-gray-400">Minimalist URL Shortener</p>
        </div>
        
        <form action={createLink} className="flex gap-2">
          <input 
            name="url"
            type="text" 
            placeholder="Paste your long URL here..." 
            className="flex-1 p-4 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600"
            required
            autoComplete="off"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-transform active:scale-95 whitespace-nowrap"
          >
            Shorten It
          </button>
        </form>

        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
            Recent Links
          </h3>
          
          <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors group">
                <div className="overflow-hidden mr-2">
                  <a 
                    href={`/${link.shortCode}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 font-mono text-lg font-medium hover:underline block"
                  >
                    /{link.shortCode}
                  </a>
                  <p className="text-gray-500 text-xs truncate max-w-50">
                    {link.originalUrl}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="text-gray-400 text-[10px] font-mono bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                    {link.clicks} clicks
                  </span>
                <div className="flex gap-2">
                  <QrButton shortCode={link.shortCode} />
                  <CopyButton shortCode={link.shortCode} />
                </div>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-600 text-sm">No links created yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}