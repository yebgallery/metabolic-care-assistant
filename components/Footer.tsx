import Image from "next/image";
import React from "react";
import WidthConstraint from "./WidthConstraint";
import { NAV_ITEMS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="">
      <WidthConstraint className="footer py-10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col  gap-2">
          <ul className="flex gap-4 items-center justify-start">
            {NAV_ITEMS.filter((item) => item.path !== "/artists/kwabena-yeboah").map(
              (item) => (
                <li key={item.path}>
                  <a href={item.path} className="text-[10px] barlow uppercase">
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>

          <a href="/">
            <Image
              src="/assets/logo.svg"
              alt="Yeb Gallery Logo"
              width={100}
              height={100}
            />
          </a>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-start gap-4  md:items-center">
          <ul className="flex items-center gap-4 ">
            <li>
              <a
                href="https://facebook.com/pridelands.africa?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/fb.svg" alt="Facebook icon" width={28} height={28} />
              </a>
            </li>
            <li>
              <a
                title="Follow Yeb Gallery on Artsy"
                href="https://www.artsy.net/partner/yeb-gallery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/artsy.svg" alt="" width={28} height={28} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/yebgallery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/ig.svg" alt="Instagram icon" width={28} height={28} />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://linkedin.com/posts/strecsolutions_yeb-gallery-artist-run-gallery-of-contemporary-activity-7161851419954790400-y1Jh"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/linkedin-round-svgrepo-com.svg"
                  alt="Linkedin icon"
                  width={28}
                  height={28}
                />
              </a>
            </li>

            {/* <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/wiki.svg" alt="" width={28} height={28} />
            </a>
          </li> */}
          </ul>

          <a
            title="Follow Yeb Gallery on Artsy"
            href="https://www.artsy.net/partner/yeb-gallery?utm_campaign=artsy-embedded-widget&utm_source=volt&utm_medium=embedded-widget"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://files.artsy.net/images/artsy-follow-us-290x64_0.png"
              width="145"
              height="32"
              alt="Follow Yeb Gallery on Artsy"
            />
          </a>
        </div>
      </WidthConstraint>
    </footer>
  );
};

export default Footer;
