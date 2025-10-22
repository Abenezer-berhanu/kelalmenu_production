import { auth } from "@/lib/auth";
import { links } from "@/lib/exporter";
import { redirect } from "next/navigation";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user) redirect(links.hotel_dashboard + `/${session.user.id}`);
  return <div>{children}</div>;
}

export default layout;
