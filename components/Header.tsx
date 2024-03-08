"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import WidthConstraint from "./WidthConstraint";
import { NAV_ITEMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const [check, setCheck] = useState(false);
  const navRef = useRef<HTMLHeadingElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setCheck(false);
    }
  };

  useEffect(() => {
    setCheck(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setCheck(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`py-4 z-[50] overflow-clip fixed top-0 w-screen bg-[#fff]`}
      ref={navRef}
    >
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

        <AnimatePresence>
          {check && (
            <motion.nav
              key="nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <ul className="flex flex-col gap-4 nav-link pb-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </WidthConstraint>
    </header>
  );
};

export default Header;
