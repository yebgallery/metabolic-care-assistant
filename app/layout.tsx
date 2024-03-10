import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="gcYK1qgg6ho4_tZktWutbkRy8tb7-0AXdMmA-55SLNg"
        />
        <link rel="preload" href="/assets/loader.png" as="image" />
      </head>
      <body>
        <Header />
        <Toaster />
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}
