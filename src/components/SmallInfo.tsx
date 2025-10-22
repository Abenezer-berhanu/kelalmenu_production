import React from "react";

function SmallInfo({ info }: { info: string }) {
  return <small className="text-primary text-start">{info}</small>;
}

export default SmallInfo;
