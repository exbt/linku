import { prisma } from "@/lib/db";
import { createLink } from "./actions";
import CopyButton from "@/components/CopyButton";
import QrButton from "@/components/QrButton";
import DeleteButton from "@/components/DeleteButton";
import Navbar from "@/components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { Link2, MousePointerClick } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { userId } = await auth();

  const links = userId 
    ? await prisma.link.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        take: 10 
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
      
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <Navbar />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Linku
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {userId ? "Manage your links with advanced analytics." : "Simple, fast, and secure URL shortener for everyone."}
          </p>
        </div>
        
        {userId ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-28 shadow-xl shadow-blue-900/5">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Link2 className="text-blue-500" /> 
                Create New Link
              </h2>
              
              <form action={createLink} className="flex flex-col gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">DESTINATION URL</label>
                  <input 
                    name="url"
                    type="text" 
                    placeholder="https://example.com/very-long-url" 
                    className="w-full p-4 rounded-xl bg-gray-950 border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-700"
                    required
                    autoComplete="off"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 mt-2"
                >
                  Shorten Now
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <h2 className="text-xl font-bold text-gray-200">Your Dashboard</h2>
                 <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded-full border border-gray-800">
                    {links.length} Links Found
                 </span>
              </div>

              <div className="grid gap-3">
                {links.map((link) => (
                  <div key={link.id} className="bg-gray-900/50 border border-gray-800 p-5 rounded-xl hover:border-gray-700 hover:bg-gray-900 transition-all group">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="overflow-hidden space-y-1">
                        <div className="flex items-center gap-2">
                          <a href={`/${link.shortCode}`} target="_blank" className="text-blue-400 font-mono text-xl font-semibold hover:text-blue-300 hover:underline">
                            /{link.shortCode}
                          </a>
                        </div>
                        <p className="text-gray-500 text-sm truncate max-w-md">
                          {link.originalUrl}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 sm:border-l sm:border-gray-800 sm:pl-4">
                        <div className="text-center min-w-15">
                          <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                            <MousePointerClick size={12} /> Clicks
                          </div>
                          <span className="text-lg font-bold text-white">{link.clicks}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <QrButton shortCode={link.shortCode} />
                          <CopyButton shortCode={link.shortCode} />
                          
                          <div className="w-px h-6 bg-gray-800 mx-1"></div>
                          
                          <DeleteButton linkId={link.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {links.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-2xl bg-gray-900/30">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-400 mb-3">
                      <Link2 size={24} />
                    </div>
                    <p className="text-gray-400 font-medium">No links created yet.</p>
                    <p className="text-gray-600 text-sm mt-1">Paste a URL on the left to get started.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-900 p-1 rounded-2xl border border-gray-800 shadow-2xl mb-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="bg-gray-950 rounded-xl p-8 max-w-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Why use Linku?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="space-y-2">
                       <div className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg font-bold">1</div>
                       <h4 className="font-semibold text-gray-200">Fast & Secure</h4>
                       <p className="text-xs text-gray-500">Instant redirection with industry standard uptime.</p>
                    </div>
                    <div className="space-y-2">
                       <div className="bg-purple-500/10 text-purple-400 w-8 h-8 flex items-center justify-center rounded-lg font-bold">2</div>
                       <h4 className="font-semibold text-gray-200">Detailed Analytics</h4>
                       <p className="text-xs text-gray-500">Track clicks, locations and devices.</p>
                    </div>
                    <div className="space-y-2">
                       <div className="bg-pink-500/10 text-pink-400 w-8 h-8 flex items-center justify-center rounded-lg font-bold">3</div>
                       <h4 className="font-semibold text-gray-200">QR Codes</h4>
                       <p className="text-xs text-gray-500">Generate QR codes for your links instantly.</p>
                    </div>
                  </div>
               </div>
            </div>
            
            <p className="text-gray-500">Please sign in to access the dashboard.</p>
          </div>
        )}

      </main>
    </div>
  );
}