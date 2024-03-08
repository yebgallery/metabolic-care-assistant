import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export default function WidthConstraint(props: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("max-w-[1200px] mx-auto px-5", props.className)}>
      {props.children}
    </div>
  );
}
