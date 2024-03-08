import CurrentExhibition from "@/components/Home/CurrentExhibition";
import HeroCarousel from "@/components/Home/HeroCarousel";
import HeroExhibitions from "@/components/Home/HeroExhibitions";
import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Yeb Gallery | Home",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `Yeb Gallery | Home`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | Home}`,
    description: siteConfig.description,
    // images: [user.photo],
    creator: "@dev__steve",
  },
};

export default async function Home() {
  noStore();
  const newsFeed =
    await sanityClient.fetch(`*[_type == "news"  ] | order(_createdAt desc){
  _id,
  title,
  slug,
  excerpt,
  eventdate,
  "image": mainImage.asset->url
}`);

  const heroExhibitions =
    await sanityClient.fetch(`*[_type == "post" && "current" in categories[]->title ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    eventdate,
    eventlocation,
    brief,
    "image": mainImage.asset->url
  }`);

  return (
    <main className="">
      <HeroCarousel posts={heroExhibitions.slice(0, 2)} />
      <div className="z-[20] relative">
        <NewsSection news={newsFeed} title="Featured News" />
        <CurrentExhibition
          current={heroExhibitions.find(
            (item) =>
              item.slug.current ===
              "kwabena-yeboah-threads-of-life-ii-solo-art-exhibition"
          )}
        />
        <HeroExhibitions
          posts={heroExhibitions.filter(
            (item) =>
              item.slug.current !==
              "kwabena-yeboah-threads-of-life-ii-solo-art-exhibition"
          )}
        />
      </div>
    </main>
  );
}
