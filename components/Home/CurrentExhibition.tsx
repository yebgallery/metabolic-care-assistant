import React from "react";
import WidthConstraint from "../WidthConstraint";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/utils/image-builder";
import { Post } from "@/interfaces";

const CurrentExhibition = (props: { current: Post }) => {
  return (
    <section className="pt-10 pb-20  bg-[#fff] ">
      <WidthConstraint className="space-y-10">
        <h2 className="font-[600] text-[18px] uppercase">Current</h2>
        <div>
          <Link className="" href={`/exhibitions/${props.current.slug.current}`}>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="grid  grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <Image
                src={urlFor(props.current.image).url()}
                width={1000}
                height={1000}
                alt=""
                className="w-full lg:h-[450px] max-h-[550px] object-cover"
              />
              <div className="flex gap-4 justify-center flex-col">
                <h2 className="text-[30px] leading-[40px] tracking-[4.8px]">
                  {props.current.title}
                </h2>
                <span>{props.current.eventlocation}</span>
                <hr />
                <span>{props.current.eventdate}</span>
                <p className="mt-3">{props.current.brief}</p>
                <Link href="#" className="text-dark">
                  READ MORE
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default CurrentExhibition;
