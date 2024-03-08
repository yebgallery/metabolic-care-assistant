import React from "react";
import Image from "next/image";
import Link from "next/link";
import WidthConstraint from "../WidthConstraint";
import { urlFor } from "@/utils/image-builder";

const NewsSection = (props: { news: any[]; title: string }) => {
  return (
    <section className="py-20 bg-[#fff] ">
      <WidthConstraint className="space-y-10 ">
        <h2 className="font-[600] text-[18px] uppercase">{props.title}</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {props.news.map((item) => (
            <Link key={item} href={`/news/${item.slug.current}`}>
              <Image
                src={urlFor(item.image).url()}
                className="object-cover w-full lg:h-[260px]"
                width={500}
                height={500}
                alt=""
              />
              <div className="space-y-2 py-4">
                <h2 className="text-[18px]">{item.title}</h2>
                <span className="text-[14px]">{item.excerpt}</span>
                <p className="text-[#7F7F7F] tracking-[1.84px] text-[12px]">
                  {item.eventdate}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default NewsSection;
