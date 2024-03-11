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
import { unstable_noStore } from "next/cache";
import ErrorComponent from "@/components/Error";

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
    title: `Exhibition | ${post.title}`,
    description: post.brief ?? siteConfig.description.exhibitions,
    alternates: {
      canonical: `/exhibitions/${params.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en",
      url: siteConfig.url,
      title: `Exhibition | ${post.title}`,
      description: post.brief ?? siteConfig.description.exhibitions,
      siteName: siteConfig.name,
      images: post.installationViews
        ? post.installationViews.map((item) => item.asset.url)
        : [siteConfig.url],
    },
    twitter: {
      card: "summary_large_image",
      title: `Exhibition | ${post.title}`,
      description: post.brief ?? siteConfig.description.exhibitions,
      images: post.installationViews
        ? post.installationViews.map((item) => item.asset.url)
        : [siteConfig.url],
      creator: "Stephen Okyere",
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<React.JSX.Element> {
  unstable_noStore();
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

  const NAV_FILTERS = [
    {
      label: "Overview",
      path: "#overview",
    },
    {
      label: "Installation Views",
      path: "#installation",
    },
    {
      label: "Photos",
      path: "#photos",
    },
  ];

  if (!post || !post.mainImage) return <ErrorComponent title={`No Exhibition to show`} />;

  return (
    <>
      <div className="h-[calc(100vh-100px)]">
        <Image
          src={urlFor(post.mainImage).url()}
          width={1000}
          height={1000}
          alt={`Art by ${post.name}`}
          className="h-full w-full object-cover parallax"
        />
      </div>
      <WidthConstraint className="my-20 space-y-10">
        <div className="space-y-4 lg:space-y-10">
          <h1
            className="font-[600] text-[24px] uppercase  scroll-m-[120px]"
            id="overview"
          >
            {post.title}
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row justify-between items-start  lg:items-center">
            <p className="">
              {post.eventlocation} {post.eventdate}
            </p>
            <ul className="flex items-center flex-wrap justify-between w-full sm:w-max lg:justify-start gap-4">
              {NAV_FILTERS.map((item) => (
                <li key={item.path}>
                  <Link className="nav-link" href={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col pb-20 lg:flex-row-reverse justify-between gap-10">
          <div className="lg:w-[40%] lg:max-h-[400px]">
            {post.exhibitionImage && (
              <Image
                src={urlFor(post.exhibitionImage).url()}
                width={500}
                height={500}
                alt={`Exhibited Art by ${post.name}`}
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
          <div className="space-y-10 pb-20 scroll-m-[100px]" id="installation">
            <h2 className="font-[600] text-[18px] uppercase">Installation View</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {post.installationViews.map(
                (item: { asset: { _id: string; url: string } }, index: number) => (
                  <Image
                    key={item.asset._id}
                    src={item.asset.url}
                    width={500}
                    height={500}
                    alt={`Installation view ${index + 1} of ${post.title}`}
                    className="h-full w-full object-cover"
                  />
                )
              )}
            </div>
          </div>
        )}
        {post.photographs && (
          <div className="space-y-10 scroll-m-[100px]" id="photos">
            <h2 className="font-[600] text-[18px] uppercase">Photographs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {post.photographs.map(
                (item: { asset: { _id: string; url: string } }, index: number) => (
                  <Image
                    key={item.asset._id}
                    src={item.asset.url}
                    width={500}
                    height={500}
                    alt={`Photograph ${index + 1} of ${post.title}`}
                    className="h-full w-full object-cover"
                  />
                )
              )}
            </div>
          </div>
        )}
      </WidthConstraint>
    </>
  );
}
