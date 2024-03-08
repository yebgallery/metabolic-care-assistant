import CurrentExhibition from "@/components/Home/CurrentExhibition";
import HeroCarousel from "@/components/Home/HeroCarousel";
import HeroExhibitions from "@/components/Home/HeroExhibitions";
import NewsSection from "@/components/Home/NewsSection";
import sanityClient from "@/config/sanity";
import { unstable_noStore as noStore } from "next/cache";

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
      <NewsSection news={newsFeed} title="Featured News" />
      <CurrentExhibition
        current={heroExhibitions.find(
          (item) =>
            item.slug.current === "kwabena-yeboah-threads-of-life-ii-solo-art-exhibition"
        )}
      />
      <HeroExhibitions
        posts={heroExhibitions.filter(
          (item) =>
            item.slug.current !== "kwabena-yeboah-threads-of-life-ii-solo-art-exhibition"
        )}
      />
    </main>
  );
}
