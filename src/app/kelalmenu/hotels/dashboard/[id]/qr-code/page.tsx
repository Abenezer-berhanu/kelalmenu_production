import BigInfo from "@/components/BigInfo";
import DashboardButton from "@/components/DashboardButton";
import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";
import QrCodeGenerator from "./_components/QrCodeGenerator";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-[800px]">
      <DashboardButton id={id} />
      <BigInfo
        className="block text-start text-primary"
        info="Generate Your QR-code if not yet or download the existing one"
      />
      <Suspense fallback={<Spinner />}>
        <QrCodeGenerator hotelId={id} />
      </Suspense>
    </div>
  );
}

export default page;
