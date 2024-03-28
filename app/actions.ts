"use server";

import { cookies } from "next/headers";

export async function setCookie(data: { name: string; value: string }) {
  cookies().set({
    name: data.name,
    value: data.value,
    path: "/",
  });
}
