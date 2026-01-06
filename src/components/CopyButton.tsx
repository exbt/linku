'use client'

import { useState } from "react";

export default function CopyButton({ shortCode }: { shortCode: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 border
        ${isCopied 
          ? "bg-green-500/20 text-green-400 border-green-500/50" 
          : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
        }
      `}
    >
      {isCopied ? "Copied! ✅" : "Copy"}
    </button>
  );
}