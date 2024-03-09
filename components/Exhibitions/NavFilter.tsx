"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavFilter = () => {
  const pathname = usePathname();

  const NAV_FILTERS = [
    {
      label: "All",
      path: "/exhibitions/category/all",
    },
    {
      label: "Current",
      path: "/exhibitions/category/current",
    },
    {
      label: "Past",
      path: "/exhibitions/category/past",
    },
  ];

  return (
    <ul className="flex items-center gap-4">
      {NAV_FILTERS.map((item) => (
        <li className="nav-item" key={item.path}>
          <Link
            href={item.path}
            className={`nav-link ${
              item.path === pathname ? "text-text" : "text-text-accent"
            }`}
            aria-current="page"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavFilter;
