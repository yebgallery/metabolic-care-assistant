import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/utils/image-builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import sanityClient from "@/config/sanity";
import NewsSection from "@/components/Home/NewsSection";
import WidthConstraint from "../../../components/WidthConstraint";
import { siteConfig } from "@/config/site-config";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!params.slug) return;
  const details =
    await sanityClient.fetch(`*[_type == "news" && slug.current == "${params.slug}"] {
    _id,
    title,
   "image": mainImage{
    asset->{
    _id,
    url
  }
  },
  }[0]
  `);
  return {
    title: details.title,
    description: siteConfig.description,
    openGraph: {
      type: "website",
      locale: "en",
      url: siteConfig.url,
      title: details.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      image: details.image.asset.url,
      images: [details.image.asset.url],
    },
    twitter: {
      card: "summary_large_image",
      title: details.title,
      description: siteConfig.description,
      image: details.image.asset.url,
      images: [details.image.asset.url],
      creator: "@dev__steve",
    },
  };
}

export default async function Page({ params }) {
  const newsFeed =
    await sanityClient.fetch(`*[_type == "news"  ] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
     body, 
  "image": mainImage.asset->url,
   "name":artist->name,
  "artistImage":artist->image
}`);

  const post = newsFeed
    ? newsFeed.find((item) => item.slug.current === params.slug)
    : null;
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
  if (!post) return <>No post available</>;
  return (
    <section className="py-10 lg:py-20 space-y-10">
      <WidthConstraint>
        <div className="flex flex-col-reverse lg:flex-row gap-10 justify-content-between">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="font-[600] text-[24px] uppercase">{post.title}</h1>
              <p className="news-location mb-5">
                {post.excerpt} {post.eventdate}
              </p>
            </div>
            <article className="leading-[30px] text-[18px]">
              <PortableText components={ptComponents} value={post.body} />
            </article>
          </div>
          <div className="lg:w-[35%] max-h-[430px]">
            <Image
              src={urlFor(post.image).url()}
              width={500}
              height={500}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="news-p position-absolute">
          {/* <p className="related-artist mb-4">Related Artist</p>

        <hr />
        <Link href="/news" className="news-link">
          <div className="d-flex flex-row justify-content-start align-items-center mt-3 mb-5">
            <img v-if="post.artistImage" :src="imageUrlFor(post.artistImage)" className="rounded-circle me-3"
              style="width: 50px; height: 50px" alt="Avatar" />
                            
            <p className="related-artist mt-4">
              { post.name }
            </p>
          </div>
        </Link> */}
        </div>
      </WidthConstraint>
      <NewsSection news={newsFeed} title="News" />
    </section>
  );
}
