import sanityClient from "@/config/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/utils/image-builder";
import { siteConfig } from "@/config/site-config";
import { Post } from "@/interfaces";

export async function generateMetadata({ params }: { params: { category: string } }) {
  if (!params.category) return;
  const category = params.category.split("")[0].toUpperCase() + params.category.slice(1);
  return {
    title: `Yeb Gallery | ${category}`,
    description: siteConfig.description,
    openGraph: {
      type: "website",
      locale: "en",
      url: siteConfig.url,
      title: `Yeb Gallery | ${category}`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [siteConfig.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `Yeb Gallery | ${category}`,
      description: siteConfig.description,
      images: [siteConfig.image],
      creator: "@dev__steve",
    },
  };
}

export default async function Page({
  params,
}: {
  params: { category: string };
}): Promise<React.JSX.Element> {
  const currentRef = params.category === "forth-coming" ? "forthcoming" : params.category;
  const exhibitions: Post[] =
    await sanityClient.fetch(`*[_type == "post" && "${currentRef}" in categories[]->title] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  eventlocation,
  brief,
  "image": mainImage.asset->url
}  [0...50]`);
  if (exhibitions.length < 1)
    return <div className="capitalize min-h-[300px]">No {currentRef} Exhibitions</div>;
  return (
    <>
      {exhibitions.map((item) => (
        <Link key={item.slug.current} href={`/exhibitions/${item.slug.current}`}>
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="flex flex-wrap gap-10"
          >
            <Image
              src={urlFor(item.image).url()}
              width={1000}
              height={1000}
              alt=""
              className="w-full lg:w-[55%] lg:h-[450px] max-h-[500px] object-cover"
            />
            <div className="flex flex-1 gap-2 lg:gap-4 justify-center flex-col">
              <h2 className="text-[24px] md:text-[28px] leading-[40px] tracking-[4.8px]">
                {item.title}
              </h2>
              <span> {item.eventlocation}</span>
              <hr />
              <span>{item.eventdate}</span>
              <p>{item.brief}</p>
              <p>READ MORE</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
