import sanityClient from "@/config/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/utils/image-builder";
import { siteConfig } from "@/config/site-config";
import { Post } from "@/interfaces";
import { unstable_noStore } from "next/cache";
import WidthConstraint from "@/components/WidthConstraint";
import NavFilter from "@/components/Exhibitions/NavFilter";
import ErrorComponent from "@/components/Error";

export async function generateMetadata({ params }: { params: { category: string } }) {
  if (!params.category) return;
  const category = params.category.split("")[0].toUpperCase() + params.category.slice(1);
  return {
    title: `Yeb Gallery | ${category} Exhibitions`,
    description: siteConfig.description,
    alternates: {
      canonical: `/exhibitions/category/${params.category}`,
    },
    openGraph: {
      type: "website",
      locale: "en",
      url: siteConfig.url,
      title: `Yeb Gallery | ${category} Exhibitions`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [siteConfig.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `Yeb Gallery | ${category} Exhibitions`,
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
  unstable_noStore();

  const currentRef = params.category === "forth-coming" ? "forthcoming" : params.category;
  const exhibitions: Post[] =
    params.category === "all"
      ? await sanityClient.fetch(`*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  eventlocation,
  brief,
  "name":artist->name,
  "image": mainImage.asset->url
}  [0...50]`)
      : await sanityClient.fetch(`*[_type == "post" && "${currentRef}" in categories[]->title] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  eventlocation,
  brief,
  "name":artist->name,
  "image": mainImage.asset->url
}  [0...50]`);
  if (exhibitions.length < 1)
    return (
      <ErrorComponent
        title={`No ${currentRef === "all" ? "" : currentRef} Exhibitions`}
      />
    );
  return (
    <section className="py-14 lg:py-20 space-y-10">
      <WidthConstraint>
        <div className="flex flex-col lg:flex-row justify-between gap-5 items-start md:items-center">
          <h1 className="font-[600] text-[18px] uppercase">Exhibitions</h1>
          <NavFilter />
        </div>
        <div className="flex flex-col gap-14 py-10">
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
                  alt={`Exhibited Art by ${item.name}`}
                  className="w-full lg:w-[55%] lg:h-[450px] max-h-[500px] object-cover"
                />
                <div className="flex flex-1 gap-2 lg:gap-4 justify-center flex-col">
                  <h2 className="text-[24px] md:text-[28px] leading-[40px] tracking-[4.8px]">
                    {item.title}
                  </h2>
                  <span className="text-text-accent"> {item.eventlocation}</span>
                  <hr color="#7F7F7F" />
                  <span className="text-text-accent">{item.eventdate}</span>
                  <p>{item.brief}</p>
                  <p>READ MORE</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
}
