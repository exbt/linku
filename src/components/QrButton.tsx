'use client'

import { useState } from "react";
import QRCode from "react-qr-code";
import { QrCode, X } from "lucide-react";

export default function QrButton({ shortCode }: { shortCode: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/${shortCode}` 
    : `/${shortCode}`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-md bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
        title="Show QR Code"
      >
        <QrCode size={16} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 p-1 bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-gray-900">Scan Me! 📱</h3>
              <div className="p-2 bg-white border-2 border-gray-100 rounded-xl">
                <QRCode 
                  value={fullUrl} 
                  size={200}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <p className="text-sm text-gray-500 text-center break-all font-mono">
                {fullUrl}
              </p>
            </div>
          </div>
          
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}