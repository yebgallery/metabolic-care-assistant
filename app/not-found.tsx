import WidthConstraint from "@/components/WidthConstraint";
import React from "react";
import Link from "next/link"

const NotFound = () => {
  return (
    <WidthConstraint className="min-h-[70vh] py-20 flex-col gap-4 flex items-center justify-center">
      <h1 className="text-2xl lg:text-4xl"> Oops! This page could not be found</h1>
      <Link href="/">
        <button className="bg-black barlow py-3 flex items-center justify-center uppercase w-[200px]  text-white">
          Go Home
        </button>
      </Link>
    </WidthConstraint>
  );
};

export default NotFound;
