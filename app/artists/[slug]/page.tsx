import HeroExhibitions from "@/components/Home/HeroExhibitions";
import WidthConstraint from "@/components/WidthConstraint";
import sanityClient from "@/config/sanity";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/utils/image-builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import Link from "next/link";
// import { PortableText } from "@portabletext/react";

export default async function Page({ params }) {
  console.log(params);
  const details =
    await sanityClient.fetch(`*[_type == "artist" && slug.current == "${params.slug}"] {
        _id,
        name,
        slug,
        country,
        yob,
        "exhibition": *[_type=='post' && references(^._id)]{ title,slug,
  excerpt,
  eventdate,
  eventlocation,
  brief,
  "image": mainImage.asset->url },
        body,
        "image": image.asset->url,
        "artistImage": artistImage.asset->url,
    }[0]
    `);
  console.log(details.exhibition);
  //   console.log(details);

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value) {
          return null;
        }
        return (
          <Image
            alt="..."
            src={urlFor(value as SanityImageSource)
              .width(320)
              .height(240)
              .fit("max")
              .auto("format")
              .url()}
          />
        );
      },
    },
  };

  return (
    <section className="my-10 lg:my-20 space-y-10">
      <WidthConstraint className="space-y-6">
        <h1 className="font-[600] text-[24px] uppercase">{details.name}</h1>
        <div className="flex lg:flex-row-reverse flex-col gap-10  justify-between">
          <div className="lg:w-[35%] lg:max-h-[430px]">
            <Image
              src={urlFor(details.image).url()}
              width={500}
              height={500}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 flex justify-between gap-4 flex-col leading-[30px]">
            <article>
              <PortableText components={ptComponents} value={details.body} />
            </article>
            <Link href="https://wiki.com" target="_blank">
              <button type="button" className="bg-black text-white p-2 barlow px-4">
                Read Full Wiki - Biography {">"}
              </button>
            </Link>
          </div>
        </div>
      </WidthConstraint>
      <HeroExhibitions posts={details.exhibition} />
    </section>
  );
}
