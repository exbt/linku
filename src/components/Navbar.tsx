import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full py-4">
      
      <div className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-80 transition-opacity cursor-pointer">
        <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
          <Link2 size={24} className="text-white" />
        </div>
        <span className="tracking-tight">Linku</span>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-gray-300 hover:text-white font-medium transition-colors text-sm px-4 py-2 rounded-lg hover:bg-white/5">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-gray-800"
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}