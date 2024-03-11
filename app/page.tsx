import CurrentExhibition from "@/components/Home/CurrentExhibition";
import HeroCarousel from "@/components/Home/HeroCarousel";
import HeroExhibitions from "@/components/Home/HeroExhibitions";
import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import { siteConfig } from "@/config/site-config";
import { Post } from "@/interfaces";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Yeb Gallery | Contemporary  Art Gallery",
  description: siteConfig.description.default,
  authors: [{ name: "Stephen Okyere" }, { name: "Enoch Offei" }],
  alternates: {
    canonical: "/",
  },
  keywords: [
    "kwabena yeboah",
    "solo artist",
    "yeb gallery",
    "enoch offei",
    "kwame nkrumah museum",
    "yeb art",
    "thread of life",
    "artist-run gallery",
    "west hills mall",
    "stephen okyere",
    "silk thread art",
    "thread art",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `Yeb Gallery | Contemporary  Art Gallery`,
    description: siteConfig.description.default,
    siteName: siteConfig.name,
    images: siteConfig.image,
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | Contemporary  Art Gallery`,
    description: siteConfig.description.default,
    images: siteConfig.image,
    creator: "Stephen Okyere",
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
}[0...3]`);

  const heroExhibitions: Post[] =
    await sanityClient.fetch(`*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    eventdate,
    eventlocation,
    brief,
    "name":artist->name,
    "image": mainImage.asset->url
  }[0...4]`);

  return (
    <main>
      <HeroCarousel posts={heroExhibitions.slice(0, 2)} />
      <div className="z-[20] relative">
        <NewsSection
          news={newsFeed}
          title={<h2 className="font-[600] text-[18px] uppercase">Featured News</h2>}
          showMore
          className="md:grid-cols-2 lg:grid-cols-3"
        />
        <CurrentExhibition
          current={
            heroExhibitions.find(
              (item) => item.slug.current === "kwabena-yeboah-threads-of-life-ii"
            ) as Post
          }
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
