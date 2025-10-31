import BigInfo from "@/components/BigInfo";
import MenuUpdateWrapper from "./_components/MenuUpdateWrapper";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

async function page({
  params,
}: {
  params: Promise<{ menuId: string; id: string }>;
}) {
  const { menuId, id } = await params;
  return (
    <div className="max-w-[800px] mx-auto">
      <BigInfo info="Update This menu" />
      <Suspense fallback={<Spinner />}>
        <MenuUpdateWrapper menuId={menuId} hotelId={id} />
      </Suspense>
    </div>
  );
}

export default page;
