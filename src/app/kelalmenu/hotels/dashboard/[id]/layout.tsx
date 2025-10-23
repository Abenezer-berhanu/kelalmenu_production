import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { links } from "@/lib/exporter";
import Link from "next/link";
import React, { ReactElement } from "react";

async function layout({
  children,
  params,
}: {
  children: ReactElement;
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user || session.user.id !== id) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mt-10">Access Denied</h1>
        <Link href={links.login}>
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }
  return <div className="p-2">{children}</div>;
}

export default layout;
