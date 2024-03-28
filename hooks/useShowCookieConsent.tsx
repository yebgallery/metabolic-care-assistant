"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CookieNames } from "@/lib/constants";

export default function useShowCookieConsent() {
  const [allowCookies, setAllowCookies] = useState(() => {
    const cookieValue = Cookies.get(CookieNames.allowConsent);
    return cookieValue === "true";
  });

  function persistCookieConsent(): void {
    Cookies.set(CookieNames.allowConsent, allowCookies.toString(), {
      expires: 100,
      path: "/",
    });
  }

  useEffect(() => {
    persistCookieConsent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowCookies, setAllowCookies]);

  return { allowCookies, setAllowCookies, persistCookieConsent };
}
