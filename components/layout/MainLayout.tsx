"use client";

import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="mt-[70px] relative">{children}</div>;
};

export default MainLayout;
