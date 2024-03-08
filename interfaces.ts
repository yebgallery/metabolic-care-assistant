import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextProps } from "next-sanity";

export interface Artist {
  _id: string;
  name: string;
  slug: {
    _id: string;
    current: string;
  };
  image: string;
  eventdate: string;
}
export interface Post {
  image: SanityImageSource;
  title: string;
  slug: {
    current: string;
    id: string;
  };
  eventlocation: string;
  eventdate: string;
  brief: string;
  mainImage: {
    _id: string;
    url: string;
  };
  installationViews: { asset: { _id: string; url: string } }[];
}
export interface News {
  _id: string;
  title: string;
  slug: {
    _id: string;
    current: string;
  };
  excerpt: string;
  eventdate: string;
  body: PortableTextProps<any>;
  image: string;
  name: string;
  artistImage: string;
}
