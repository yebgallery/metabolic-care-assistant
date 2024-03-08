"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WidthConstraint from "./WidthConstraint";
import { NAV_ITEMS } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(false);
  }, [pathname]);

  return (
    <header className="py-4 z-[50] h-auto transition-all sticky top-0 bg-[#fff]">
      <WidthConstraint className="flex flex-col justify-between gap-4">
        <div className="flex justify-between  items-center w-full">
          <Link href="/">
            <Image src="/assets/logo.svg" alt="" width={200} height={100} />
          </Link>
          {
            <nav className="">
              <ul className="hidden lg:flex gap-8 nav-link">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
              <button
                className="custom-toggler block lg:hidden"
                type="button"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <input
                  type="checkbox"
                  id="toggle-nav"
                  checked={check}
                  className="checkbox"
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <label htmlFor="toggle-nav">
                  <div className="hamburger">
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                  </div>
                </label>
              </button>
            </nav>
          }
        </div>
        {check && (
          <nav className="lg:hidden animate-in slide-in-from-top">
            <ul className=" flex flex-col  gap-4 nav-link">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </WidthConstraint>
    </header>
  );
};

export default Header;
