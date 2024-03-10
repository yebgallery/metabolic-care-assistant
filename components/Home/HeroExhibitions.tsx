import Image from "next/image";
import React from "react";
import Link from "next/link";
import WidthConstraint from "../WidthConstraint";
import { urlFor } from "@/utils/image-builder";
import { Post } from "@/interfaces";

const HeroExhibitions = (props: { posts: Post[] }) => {
  if (props.posts.length === 0) return <WidthConstraint> No Exhibitions</WidthConstraint>;
  return (
    <WidthConstraint className="pt-10 pb-20 lg:pb-32 space-y-10">
      <div className="flex justify-between">
        <h2 className="font-[600] text-[18px] uppercase">Exhibitions</h2>
        <Link
          href="/exhibitions/category/all"
          className="uppercase nav-link cursor-pointer"
        >
          View All {">"}
        </Link>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        {props.posts.map((item) => (
          <div key={item.slug.current}>
            <Link href={`/exhibitions/${item.slug.current}`}>
              <Image
                src={urlFor(item.image).url()}
                width={500}
                height={500}
                alt={`Exhibited Art by ${item.name}`}
                className="w-full object-cover lg:h-[300px]"
              />
              <div className="space-y-2 py-4">
                <h2 className="text-[18px]">{item.title}</h2>
                <span className="text-[14px] text-text-accent">{item.excerpt}</span>
                <span className="text-text-accent tracking-[1.84px] text-[12px] ">
                  {item.eventdate}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </WidthConstraint>
  );
};

export default HeroExhibitions;
