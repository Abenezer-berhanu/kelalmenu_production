import BigInfo from "@/components/BigInfo";
import SmallInfo from "@/components/SmallInfo";
import Link from "next/link";
import React from "react";

function QuickActionCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} className="p-3 w-full bg-accent rounded-sm flex flex-col">
      <BigInfo info={title} className="text-primary text-start" />
      <SmallInfo info={description} />
    </Link>
  );
}

export default QuickActionCard;
