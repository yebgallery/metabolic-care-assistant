import Image from "next/image";
import Link from "next/link";
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
                  <Link href={item.path} className="text-[10px] barlow uppercase">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <Link href="/">
            <Image src="/assets/logo.svg" alt="" width={100} height={100} />
          </Link>
        </div>

        <ul className="flex items-center gap-4 ">
          <li>
            <Link
              href="https://www.facebook.com/pridelands.africa?mibextid=LQQJ4d"
              target="_blank"
            >
              <Image src="/assets/fb.svg" alt="" width={28} height={28} />
            </Link>
          </li>
          {/* <li>
            <Link href="https://www.instagram.com/yebgallery" target="_blank">
              <Image src="/assets/artsy.svg" alt="" width={28} height={28} />
            </Link>
          </li> */}
          <li>
            <Link href="https://www.instagram.com/yebgallery" target="_blank">
              <Image src="/assets/ig.svg" alt="" width={28} height={28} />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://www.linkedin.com/posts/strecsolutions_yeb-gallery-artist-run-gallery-of-contemporary-activity-7161851419954790400-y1Jh"
            >
              <Image
                src="/assets/linkedin-round-svgrepo-com.svg"
                alt=""
                width={28}
                height={28}
              />
            </Link>
          </li>
          {/* <li>
            <Link href="#" target="_blank">
              <Image src="/assets/wiki.svg" alt="" width={28} height={28} />
            </Link>
          </li> */}
        </ul>
      </WidthConstraint>
    </footer>
  );
};

export default Footer;
