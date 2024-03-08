import React from "react";
import Image from "next/image";
import WidthConstraint from "@/components/WidthConstraint";

const Loading = () => {
  return (
    <WidthConstraint className="flex justify-center items-center h-[80vh]">
      <Image src="/assets/Untitled-design.gif" alt="Loading" width={500} height={500} />
    </WidthConstraint>
  );
};

export default Loading;
