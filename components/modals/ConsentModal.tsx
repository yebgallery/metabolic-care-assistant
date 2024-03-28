"use client";
import useShowCookieConsent from "@/hooks/useShowCookieConsent";
import React from "react";
import { motion } from "framer-motion";
import WidthConstraint from "../WidthConstraint";

const CookieConsent = () => {
  const { allowCookies, setAllowCookies } = useShowCookieConsent();

  if (allowCookies) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="sticky bottom-0 z-[30] w-full bg-white shadow-t-md py-5"
    >
      <WidthConstraint className=" w-full mx-auto flex items-start lg:items-center gap-6 flex-col md:flex-row justify-between ">
        <p className="flex flex-col md:flex-row text-[12px] lg:text-[14px] gap-1 ">
          This website uses cookies This site uses cookies to help make it more useful to
          you. Please contact us to find out more about our Cookie Policy.
        </p>
        <button
          aria-label="accept-cookies"
          onClick={() => setAllowCookies(true)}
          className="bg-black barlow py-3 text-[14px] flex items-center justify-center uppercase w-[200px]  text-white"
        >
          Accept Cookies
        </button>
      </WidthConstraint>
    </motion.div>
  );
};

export default CookieConsent;
