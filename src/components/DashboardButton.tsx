import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { links } from "@/lib/exporter";

function DashboardButton({ id }: { id: string }) {
  return (
    <Link href={links.hotel_dashboard + `/${id}`} className="">
      <Button variant={"outline"} size={"sm"}>
        &larr; Dashboard
      </Button>
    </Link>
  );
}

export default DashboardButton;
