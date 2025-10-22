import { constants } from "@/lib/exporter";
import { cn } from "@/lib/utils";
import React from "react";

function LogoText({ className }: { className?: string }) {
  return (
    <p className={cn("text-2xl text-primary font-bold", className)}>
      {constants.name}
    </p>
  );
}

export default LogoText;
