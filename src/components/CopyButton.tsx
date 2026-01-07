'use client'

import { useState } from "react";
import { Copy, Check } from "lucide-react"; 

export default function CopyButton({ shortCode }: { shortCode: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) throw new Error("Copy failed");
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

    } catch (err) {
      console.error("Copy failed:", err);
      alert("Could not be copied automatically, please select and copy manually.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        p-1.5 rounded-md border transition-all duration-200
        ${isCopied 
          ? "bg-green-500/20 text-green-400 border-green-500/50" 
          : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
        }
      `}
      title="Copy to clipboard"
    >
      {isCopied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}