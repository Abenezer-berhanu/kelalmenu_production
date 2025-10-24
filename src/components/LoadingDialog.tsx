"use client";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function LoadingDialog({ open }: { open: boolean }) {
  useEffect(() => {
    // Disable scroll when open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <Spinner />
        <p className="mt-3 text-white text-sm font-medium">Please wait...</p>
      </div>
    </div>
  );
}
