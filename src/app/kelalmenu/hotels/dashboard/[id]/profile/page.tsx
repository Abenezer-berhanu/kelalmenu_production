import { getActiveHotelInfo } from "@/actions/hotel";
import React, { Suspense } from "react";
import HotelEditor from "../_components/HotelEditor";
import Spinner from "@/components/Spinner";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotelInfo = await getActiveHotelInfo(id);

  return (
    <Suspense fallback={<Spinner />}>
      <HotelEditor hotel={hotelInfo.data} />
    </Suspense>
  );
}

export default page;
