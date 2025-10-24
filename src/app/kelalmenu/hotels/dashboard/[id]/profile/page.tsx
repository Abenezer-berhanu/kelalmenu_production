import { getActiveHotelInfo } from "@/actions/hotel";
import React from "react";
import HotelEditor from "../_components/HotelEditor";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotelInfo = await getActiveHotelInfo(id);
  return <HotelEditor hotel={hotelInfo.data} />;
}

export default page;
