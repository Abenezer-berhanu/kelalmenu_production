import React from "react";

async function page({ params }: { params: Promise<{ menuId: string }> }) {
  const { menuId } = await params;
  return <div>{menuId}</div>;
}

export default page;
