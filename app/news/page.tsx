import ErrorComponent from "@/components/Error";
import Error from "@/components/Error";
import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Yeb Gallery | News",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `Yeb Gallery | News`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.image],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | News`,
    description: siteConfig.description,
    images: [siteConfig.image],
    creator: "@dev__steve",
  },
};

export default async function Page() {
  unstable_noStore();
  const newsFeed =
    await sanityClient.fetch(`*[_type == "news"  ] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  "image": mainImage.asset->url
}`);
  if (!newsFeed) return <ErrorComponent title="Sorry, there are no news to show!" />;
  return (
    <section className="my-10 space-y-10">
      <NewsSection news={newsFeed} title="News" />
    </section>
  );
}
