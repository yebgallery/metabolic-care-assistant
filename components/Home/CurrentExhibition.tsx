import React from "react";
import WidthConstraint from "../WidthConstraint";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/utils/image-builder";
import { Post } from "@/interfaces";

const CurrentExhibition = (props: { current: Post }) => {
  if (!props.current) return null;
  return (
    <section className="pt-10 pb-20 bg-[#fff] ">
      <WidthConstraint className="space-y-10">
        <h2 className="font-[600] text-[18px] uppercase">Current</h2>
        <div>
          <Link className="" href={`/exhibitions/${props.current.slug.current}`}>
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10">
              <Image
                src={urlFor(props.current.currentImage).url()}
                width={1000}
                height={1000}
                alt={`Exhibited Art by ${props.current.name}`}
                className="w-full lg:h-[450px] max-h-[550px] object-cover"
              />
              <span className="flex gap-4 justify-center flex-col">
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] tracking-[4.8px]">
                  {props.current.title}
                </h2>
                <span className="text-text-accent">{props.current.eventlocation}</span>
                <hr />
                <span className="text-text-accent">{props.current.eventdate}</span>
                <p className="mt-3">{props.current.brief}</p>
                <p className="text-text-accent">READ MORE</p>
              </span>
            </div>
          </Link>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default CurrentExhibition;
