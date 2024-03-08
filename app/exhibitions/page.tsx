// import React from "react";
// import Link from "next/link";
// import { urlFor } from "@/utils/image-builder";
// import Image from "next/image";
// import sanityClient from "@/config/sanity";

// export default async function Page() {
//   const exhibitions =
//     await sanityClient.fetch(`*[_type == "post" && "current" in categories[]->title] | order(_createdAt desc){
//   _id,
//   title,
//   slug,
//   excerpt,
//   eventdate,
//   eventlocation,
//   brief,
//   "image": mainImage.asset->url
// }  [0...50]`);
//   return (
//     <>
//       {exhibitions.map((item) => (
//         <Link key={item} href={`exhibitions/${item.slug.current}`}>
//           <div
//             data-aos="fade-up"
//             data-aos-duration="1500"
//             className="flex flex-wrap gap-10"
//           >
//             <Image
//               src={urlFor(item.image).url()}
//               width={1000}
//               height={1000}
//               alt=""
//               className="w-full lg:w-[55%] lg:h-[450px] max-h-[500px] object-cover"
//             />
//             <div className="flex flex-1 gap-2 lg:gap-4 justify-center flex-col">
//               <h2 className="text-[28px] leading-[40px] tracking-[4.8px]">
//                 {item.title}
//               </h2>
//               <span> {item.eventlocation}</span>
//               <hr />
//               <span>{item.eventdate}</span>
//               <p>{item.brief}</p>
//               <p>READ MORE</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </>
//   );
// }
