"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WidthConstraint from "../WidthConstraint";
import { urlFor } from "@/utils/image-builder";

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

  return (
    <div className="z-0 relative">
      <div className="h-[calc(100vh-100px)]">
        <Image
          src={urlFor(props.posts[current].image).url()}
          className="w-full  h-full bg-cover object-cover parallax"
          width={1000}
          height={1000}
          alt="..."
          style={{
            transform: `translateY(${calculateParallaxOffset()}px)`,
          }}
        />
        <div className="hero-overlay" style={{ zIndex: 1 }}>
          <WidthConstraint className="text-start flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="hero-text">
              <span className="uppercase font-[400]">Exhibition | Featured</span>
              <Link href={`/exhibitions/${props.posts[current].slug.current}`}>
                <h1
                  className={`font-[700] ${
                    current !== 0 ? "hero-title" : ""
                  }  uppercase text-[32px] leading-[3.1rem] tracking-[4.3px] text-white`}
                >
                  {props.posts[current].title}
                </h1>
              </Link>
            </div>
            <div className="flex z-[10] gap-4 items-center justify-end">
              <ChevronLeft
                size={40}
                color="#fff"
                className="cursor-pointer"
                onClick={() => {
                  if (current !== 0) setCurrent((prev) => prev - 1);
                  else setCurrent(0);
                }}
              />
              <Image src="/assets/hero-icon.svg" alt="" width={100} height={100} />
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
      </div>
    </div>
  );
};

export default HeroCarousel;
