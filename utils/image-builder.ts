import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import sanityClient from "@/config/sanity";

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return imageUrlBuilder(sanityClient).image(source);
}
