import React from "react";

function BigInfo({ info, className }: { info: string; className?: string }) {
  return <b className={`text-center capitalize ${className}`}>{info}</b>;
}

export default BigInfo;
