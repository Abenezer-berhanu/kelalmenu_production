"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function DownloadButtons({
  imageUrl,
  fileName,
}: {
  imageUrl: string;
  fileName?: string;
}) {
  const downloadPng = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "qr_code"}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download PNG", err);
      toast.error(
        "Failed to download PNG. Please try opening the image and saving manually."
      );
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button onClick={downloadPng} variant={"default"}>
        <Download className="mr-2" /> Download Qr Code
      </Button>
    </div>
  );
}
