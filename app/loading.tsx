import React from "react";
import Image from "next/image";
import WidthConstraint from "@/components/WidthConstraint";
import LoadingLayout from "@/components/layout/LoadingLayout";

const Loading = () => {
  return (
    <LoadingLayout>
      <WidthConstraint className="flex justify-center items-center h-[80vh]">
        <div className="max-h-[450px] lg:max-h-[500px] w-full max-w-[450px] ">
          <Image
            src="/assets/loader.png"
            className="animate-pulse scale-[0.8]  w-full h-full"
            alt="Yeb gallery animated logo"
            priority
            width={500}
            height={500}
          />
        </div>
      </WidthConstraint>
    </LoadingLayout>
  );
};

export default Loading;
