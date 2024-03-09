import ErrorComponent from "@/components/Error";
import WidthConstraint from "@/components/WidthConstraint";
import sanityClient from "@/config/sanity";
import { siteConfig } from "@/config/site-config";
import { Artist } from "@/interfaces";
import { urlFor } from "@/utils/image-builder";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Yeb Gallery | Artists",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `Yeb Gallery | Artists`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.image],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | Artists`,
    description: siteConfig.description,
    images: [siteConfig.image],
    creator: "@dev__steve",
  },
};

export default async function Page() {
  unstable_noStore();
  const artists: Artist[] =
    await sanityClient.fetch(`*[_type == "artist" ] | order(_createdAt desc){
        _id,
        name,
        slug,
        "image": image.asset->url
      }  [0...50]`);

  if (!artists) return <ErrorComponent title={`No Artists to show`} />;
  return (
    <section className="py-14 lg:py-20 space-y-10">
      <WidthConstraint className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-[20px]">
            FEATURED ARTIST | <span className="text-[16px]">KWABENA YEBOAH</span>
          </h1>
          <Link href="/artists/kwabena-yeboah" className="w-full">
            <Image
              src="/assets/featured.jpg"
              className="min-h-[250px] max-h-[400px] object-cover"
              width={500}
              height={400}
              alt=""
            />
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="font-[600] text-[18px] uppercase">Various Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="col mb-4" data-aos="fade-up" data-aos-duration="1500">
              {artists.map((item) => (
                <Link
                  key={item.slug.current}
                  href={`/artists/${item.slug.current}`}
                  className="news-link"
                >
                  <div className="project-image">
                    <Image
                      src={urlFor(item.image).url()}
                      alt=""
                      width={400}
                      height={400}
                    />
                  </div>
                  <h2 className="project-title mt-4">{item.name}</h2>
                  <span>{item.eventdate}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
