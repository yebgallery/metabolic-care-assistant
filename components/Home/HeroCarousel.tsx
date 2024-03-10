"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WidthConstraint from "../WidthConstraint";
import { urlFor } from "@/utils/image-builder";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const HeroCarousel = (props: { posts: any[] }) => {
  const [current, setCurrent] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateParallaxOffset = () => {
    const parallaxMultiplier = 0.15;
    return scrollPosition * parallaxMultiplier;
  };
  if (!props.posts) return null;
  return (
    <div className="z-0 relative">
      <motion.div
        key={current}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-[calc(100vh-100px)]"
      >
        <Link href={`/exhibitions/${props.posts[current].slug.current}`}>
          <Image
            src={urlFor(props.posts[current].image).url()}
            className="w-full  h-full bg-cover object-cover parallax"
            width={2000}
            height={2000}
            alt="..."
            priority
            style={{
              transform: `translateY(${calculateParallaxOffset()}px)`,
            }}
          />
        </Link>
        <div className="hero-overlay" style={{ zIndex: 1 }}>
          <WidthConstraint className="text-start flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div
              className={cn(
                "space-y-6",
                current !== 0 ? "hero-text" : "hero-text-no-shadow"
              )}
            >
              <p className="uppercase font-[500] barlow">Exhibition | Featured</p>
              <h1
                className={`font-[700] ${
                  current !== 0 ? "hero-title" : ""
                }  uppercase text-[24px] md:text-[28px] lg:text-[32px] leading-[2.5rem] tracking-[4.3px] text-white`}
              >
                <Link href={`/exhibitions/${props.posts[current].slug.current}`}>
                  {props.posts[current].title}
                </Link>
              </h1>
            </div>
            <div className="flex z-[10] gap-4 items-center justify-end">
              <ChevronLeft
                size={40}
                color="#fff"
                className="cursor-pointer"
                onClick={() => {
                  if (current !== 0) setCurrent((prev) => prev - 1);
                  else setCurrent(props.posts.length - 1);
                }}
              />
              <button
                aria-label="Yeb Gallery Logo Icon"
                className="transition-transform active:scale-90"
              >
                <Image
                  src="/assets/hero-icon.svg"
                  alt={`Yeb Gallery Logo Rounded Icon`}
                  width={100}
                  height={100}
                />
              </button>
              <ChevronRight
                size={40}
                color="#fff"
                className="cursor-pointer"
                onClick={() => {
                  if (current !== props.posts.length - 1) setCurrent((prev) => prev + 1);
                  else setCurrent(0);
                }}
              />
            </div>
          </WidthConstraint>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroCarousel;
