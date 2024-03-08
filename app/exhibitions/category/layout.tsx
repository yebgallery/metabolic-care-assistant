import WidthConstraint from "@/components/WidthConstraint";
import Link from "next/link";
import React, { ReactNode } from "react";

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="my-10 lg:my-20 space-y-10">
      <WidthConstraint>
        <div className="flex flex-col lg:flex-row justify-between gap-5 items-start md:items-center">
          <h2 className="font-[600] text-[18px] uppercase">Exhibitions</h2>
          <ul className="flex items-center gap-4">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                href="/exhibitions/category/current"
              >
                Current
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/exhibitions/category/forth-coming"
                className="nav-link"
                aria-current="page"
              >
                Forthcoming
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/exhibitions/category/past"
                className="nav-link"
                aria-current="page"
              >
                Past
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-14 py-10">{children}</div>
      </WidthConstraint>
    </section>
  );
};

export default CategoryLayout;
