import { getActiveHotelInfo } from "@/actions/hotel";
import DownloadButtons from "./DownloadButtons";
import { Card } from "@/components/ui/card";
import { basic_info, constants } from "@/lib/exporter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateQrCodeForm from "./GenerateQrCodeForm";

async function QrCodeGenerator({ hotelId }: { hotelId: string }) {
  const user = await getActiveHotelInfo(hotelId);

  if (user.error || !user.data) {
    return (
      <Card className="text-lg text-slate-600 font-bold px-3">
        Hotel has not been found. please check your connection and refresh the
        page.
        <small>
          if this error persists please contact support with
          <Link href={basic_info.phoneCTA} className="underline text-primary">
            {basic_info.phone}
          </Link>
        </small>
      </Card>
    );
  }

  return (
    <div className="">
      {user.data.isQrGenerated ? (
        <div>
          <Image
            src={user.data.qrCode.url}
            alt="QR Code"
            width={700}
            height={700}
            className="max-w-[200px] w-full h-full max-h-[200px]"
          />
          <div>
            <DownloadButtons
              imageUrl={user.data.qrCode.url}
              fileName={`qr_code_${constants.name}`}
            />
          </div>
        </div>
      ) : (
        <GenerateQrCodeForm hotelId={hotelId} hotelName={user.data.home_name} />
      )}
    </div>
  );
}

export default QrCodeGenerator;
