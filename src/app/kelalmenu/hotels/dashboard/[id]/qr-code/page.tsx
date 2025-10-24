import DashboardButton from "@/components/DashboardButton";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <DashboardButton id={id} />
      Qr code
    </div>
  );
}

export default page;
