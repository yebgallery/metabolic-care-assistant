import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import React from "react";

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
