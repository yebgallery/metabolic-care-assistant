import sanityClient from "@/config/sanity";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/utils/image-builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import WidthConstraint from "@/components/WidthConstraint";
import { siteConfig } from "@/config/site-config";
import { Post } from "@/interfaces";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!params.slug) return;
  const post: Post = await sanityClient.fetch(
    `*[slug.current == "${params.slug}"] {
  _id,
  title,
  brief,
  photographs[] {
    asset-> {
      _id,
      url,
    }
  },
  "mainImage": mainImage.asset-> {
    _id,
    url
  },
}[0]
`
  );
  return {
    title: post.title,
    description: post.brief ?? siteConfig.description,
    openGraph: {
      type: "website",
      locale: "en",
      url: siteConfig.url,
      title: post.title,
      description: post.brief ?? siteConfig.description,
      siteName: siteConfig.name,
      image: post.mainImage.url,
      images: post.installationViews
        ? post.installationViews.map((item) => item.asset.url)
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.brief ?? siteConfig.description,
      image: post.mainImage.url,
      images: post.installationViews
        ? post.installationViews.map((item) => item.asset.url)
        : [],
      creator: "@dev__steve",
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<React.JSX.Element> {
  const post = await sanityClient.fetch(
    `*[slug.current == "${params.slug}"] {
  _id,
  title,
  slug,
  excerpt,
  brief,
  eventdate,
  eventlocation,
  photographs[] {
    asset-> {
      _id,
      url,
    }
  },
  "installationViews": installationViewImage[] {
    asset-> {
      _id,
      url,
    }
  },
  body, 
  "mainImage": mainImage.asset-> {
    _id,
    url
  },
  "exhibitionImage": exhibitionImage.asset-> {
    _id,
    url
  },
  "name": artist->name,
  "artistImage": artist->image.asset-> {
    _id,
    url
  }
}[0]
`
  );

  const ptComponents = {
    types: {
      image: ({ value }: { value: SanityImageSource }) => {
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
  if (!post) return <>No post</>;

  return (
    <>
      {post.mainImage && (
        <div className="h-[calc(100vh-100px)]">
          <Image
            src={urlFor(post.mainImage).url()}
            width={1000}
            height={1000}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <WidthConstraint className="my-20 space-y-10">
        <h1 className="font-[600] text-[24px] uppercase">{post.title}</h1>
        <div className="flex flex-col lg:flex-row justify-between items-start  lg:items-center">
          <p className="">
            {post.eventlocation} {post.eventdate}
          </p>
          <ul className="flex items-center flex-wrap">
            <li className="nav-item">
              <Link
                className="nav-link active fw-normal me-4"
                aria-current="page"
                href={`/exhibitions/${post.slug.current}/#`}
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={`/exhibitions/${post.slug.current}/#installation`}
                className="nav-link active fw-normal me-4"
                aria-current="page"
              >
                Installation Views
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={`/exhibitions/${post.slug.current}/#photos`}
                className="nav-link active fw-normal me-4"
                aria-current="page"
              >
                Photographs
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col pb-20 lg:flex-row-reverse justify-between gap-10">
          <div className="lg:w-[40%] lg:max-h-[400px]">
            {post.exhibitionImage && (
              <Image
                src={urlFor(post.exhibitionImage).url()}
                width={500}
                height={500}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex-1">
            <article className="leading-[30px] text-[18px]">
              <span className="exhibition-quote">{post.brief}</span>
              <PortableText components={ptComponents} value={post.body} />
            </article>
          </div>
        </div>
        {post.installationViews && (
          <div className="space-y-10" id="installation">
            <h2 className="font-[600] text-[18px] uppercase">Installation View</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {post.installationViews.map(
                (item: { asset: { _id: string; url: string } }) => (
                  <Image
                    key={item.asset._id}
                    src={item.asset.url}
                    width={500}
                    height={500}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )
              )}
            </div>
          </div>
        )}
        {post.photographs && (
          <div className="space-y-10" id="photographs">
            <h2 className="font-[600] text-[18px] uppercase">Photographs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {post.photographs.map((item: { asset: { _id: string; url: string } }) => (
                <Image
                  key={item.asset._id}
                  src={item.asset.url}
                  width={500}
                  height={500}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </WidthConstraint>
    </>
  );
}
