'use client'

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteLink } from "@/app/actions";

export default function DeleteButton({ linkId }: { linkId: string }) {
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this link?")) {
      startTransition(async () => {
        await deleteLink(linkId);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isPending}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${isHovered ? "bg-red-500/20 text-red-400" : "text-gray-600 hover:text-red-400"}
      `}
      title="Delete Link"
    >
      {isPending ? (
        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}