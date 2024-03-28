import { siteConfig } from "@/config/site-config";
import { CookieNames } from "@/lib/constants";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const url = `https://api.beehiiv.com/v2/publications/${process.env.PUBLICATION_ID}/subscriptions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEEHIV_API_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: siteConfig.url,
        utm_campaign: "website",
        utm_medium: "organic",
        referring_site: siteConfig.url,
        custom_fields: [
          {
            name: "First Name",
            value: data.firstName,
          },
          {
            name: "Last Name",
            value: data.lastName,
          },
        ],
      }),
    });
    if (response.ok) {
      const data = await response.json();
      cookies().set(CookieNames.signedNewsletter, "true");
      return Response.json({ data });
    }
    cookies().set(CookieNames.signedNewsletter, "false");
  } catch (error) {
    console.log(error);
    cookies().set(CookieNames.signedNewsletter, "false");
    return Response.json({ error: 500, message: "Error subscribing to publication" });
  }
}
