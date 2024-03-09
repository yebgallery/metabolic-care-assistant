import React from "react";
import Link from "next/link";
import WidthConstraint from "./WidthConstraint";

const ErrorComponent = ({ title }: { title: string }) => {
  return (
    <WidthConstraint className="min-h-[70vh] py-20 flex-col gap-4 flex items-center justify-center">
      <h1 className="text-2xl lg:text-4xl">{title}</h1>

      <Link href="/">
        <button className="bg-black barlow py-3 flex items-center justify-center uppercase w-[200px]  text-white">
          Go Home
        </button>
      </Link>
    </WidthConstraint>
  );
};

export default ErrorComponent;
