import ContactForm from "@/components/ContactForm";
import WidthConstraint from "@/components/WidthConstraint";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Yeb Gallery | About",
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `Yeb Gallery | About`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.image],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeb Gallery | About`,
    description: siteConfig.description,
    images: [siteConfig.image],
    creator: "@dev__steve",
  },
};

const Page = () => {
  return (
    <section className="py-14 lg:py-20 space-y-10">
      <WidthConstraint className="space-y-5">
        <h1 className="font-[600] text-[24px] uppercase">About</h1>
        <div className="flex flex-col lg:flex-row-reverse gap-10 justify-between">
          <div className="lg:w-[35%] lg:max-h-[430px]">
            <Image
              src="/assets/kwabena_yeboah.png"
              className="h-full w-full object-cover"
              width={500}
              height={500}
              alt=""
            />
          </div>
          <div className="flex-1 leading-[30px]">
            <div className="space-y-2 pb-10">
              <h2 className="font-[600] text-[18px] uppercase"> Kwabena Yeboah</h2>
              <p className="font-[300]">
                Kwabena Yeboah (b. 1960), also known as Yeb, is a pioneering Ghanaian
                contemporary artist renowned for developing handwoven silk thread art in
                Africa. His acclaimed work is held in prestigious institutions including
                The Kwame Nkrumah Museum of Ghana, Novartis Headquarters in Switzerland,
                and Kalahari Resorts in the US.
              </p>
              <br />
              <Link href="/artists/kwabena-yeboah" className="text-text-accent">
                LEARN MORE {">"}
              </Link>
            </div>
            <div className="space-y-2 py-4">
              <h2 className="font-[600] text-[18px] uppercase">About Yeb Gallery</h2>
              <p className="font-[300]">
                In 2022, Yeboah founded Yeb Gallery, an artist-owned contemporary art
                gallery based in Accra, Ghana with his son Kofi Yeboah, Co-Founder and
                Gallery Director. As an artist-run space, Yeb Gallery brings Yeboah&apos;s
                contemporary African art practice alongside emerging and established
                artists to the public eye. The gallery provides an exhibition platform to
                showcase significant African contemporary art and facilitate cultural
                exchange locally and internationally. The Gallery is strategically located
                near the West Hills Mall en route to Elmina and Cape Coast Castle.
              </p>
              <br />
              <p className="font-[300]">
                Yeb Gallery attracts art enthusiasts, collectors, and historians globally,
                especially people of African descent. The gallery is housed in the Bithub
                coworking space, a hub for creativity, technology and entrepreneurship.
                Yeb Gallery also provides art consulting to collectors and corporations
                seeking to acquire work by contemporary African artists. Our expertise and
                network of art dealers and galleries helps build diverse collections that
                support the thriving arts scene across Africa.
              </p>
            </div>
            <div className="space-y-4 py-10">
              <h2 className="font-[600] text-[18px] uppercase">GALLERY OPENS</h2>
              <p className="p-2 w-max bg-black text-white">
                Monday – Saturday | 11am – 7pm
                <br />
                CLOSED SUNDAY, by appointment only
              </p>
            </div>
            <div className="space-y-4 py-10">
              <h2 className="font-[600] text-[18px] uppercase">CONTACT DETAILS</h2>
              <p>
                Kofi Yeboah, Gallery Director
                <br />
                Abigail Antwi, Gallery Assistant <br />
                Dannell Asare, Accounts <br />
              </p>
              <p className="font-[600] text-black">Info@yebgallery.com</p>
              <iframe
                className="w-full h-[250px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1702289738882!2d-0.3515793240827851!3d5.541758094438535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbd5595fe88e1%3A0x8910af9b9a5f6d1!2sYeb%20Gallery!5e0!3m2!1sen!2sgh!4v1709940578289!5m2!1sen!2sgh"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "0" }}
              ></iframe>
            </div>
            <ContactForm />
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Page;
