"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

const LoadingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
};

export default LoadingLayout;
