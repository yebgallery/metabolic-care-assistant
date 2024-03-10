import React from "react";
import Image from "next/image";
import Link from "next/link";
import WidthConstraint from "../WidthConstraint";
import { urlFor } from "@/utils/image-builder";
import { cn } from "@/utils/cn";

const NewsSection = (props: {
  news: any[];
  title: string;
  className?: string;
  showMore: boolean;
}) => {
  return (
    <section className="py-20 bg-[#fff] ">
      <WidthConstraint className="space-y-10 ">
        <div className="flex justify-between items-center">
          <h2 className="font-[600] text-[18px] uppercase">{props.title}</h2>
          {props.showMore && (
            <Link href="/news" className="uppercase nav-link cursor-pointer">
              More news {">"}
            </Link>
          )}
        </div>
        <div className={cn(props.className, "grid grid-cols-1  gap-10")}>
          {props.news.map((item) => (
            <Link key={item.slug.current} href={`/news/${item.slug.current}`}>
              <Image
                src={urlFor(item.image).url()}
                className="object-cover w-full pb-4 lg:h-[270px]"
                width={500}
                height={500}
                alt=""
              />
              <span className="space-y-2">
                <h2 className="text-[18px]">{item.title}</h2>
                <span className="text-[14px] text-text-accent">{item.excerpt}</span>
                <p className="text-text-accent tracking-[1.8px] text-[12px]">
                  {item.eventdate}
                </p>
              </span>
            </Link>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default NewsSection;
