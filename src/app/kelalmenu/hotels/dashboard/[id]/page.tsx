import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { links } from "@/lib/exporter";
import Link from "next/link";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user || session.user.id !== id) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mt-10">Access Denied</h1>
        <Link href={links.login}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      Hotel id = {id}
      {/* profile picture and button to profile here */}
      {/* rest of dashboard components here */}
    </div>
  );
}

export default page;
