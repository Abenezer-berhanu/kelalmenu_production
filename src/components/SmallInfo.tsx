import React from "react";

function SmallInfo({ info, className }: { info: string; className?: string }) {
  return <small className={`${className} text-start capitalize`}>{info}</small>;
}

export default SmallInfo;
