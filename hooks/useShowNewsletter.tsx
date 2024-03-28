import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CookieNames } from "@/lib/constants";

export default function useShowNewsletter() {
  const [newsletterSigned, setNewsletterSigned] = useState<boolean>(() => {
    const cookieValue = Cookies.get(CookieNames.signedNewsletter);
    return cookieValue === "true";
  });

  function persistCookieConsent(): void {
    Cookies.set(CookieNames.signedNewsletter, newsletterSigned.toString(), {
      expires: 1 / (24 * 60),
      path: "/",
    });
  }

  useEffect(() => {
    persistCookieConsent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { newsletterSigned, setNewsletterSigned, persistCookieConsent };
}
