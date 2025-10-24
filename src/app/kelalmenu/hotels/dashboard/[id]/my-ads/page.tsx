import DashboardButton from "@/components/DashboardButton";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <DashboardButton id={id} />
      my-ads
    </div>
  );
}

export default page;
