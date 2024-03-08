import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
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
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | News`,
    description: siteConfig.description,
    // images: [user.photo],
    creator: "@dev__steve",
  },
};

export default async function Page() {
  const newsFeed =
    await sanityClient.fetch(`*[_type == "news"  ] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  "image": mainImage.asset->url
}`);
  return (
    <section className="my-10 space-y-10">
      <NewsSection news={newsFeed} title="News" />
    </section>
  );
}
