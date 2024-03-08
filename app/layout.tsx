import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
      </head>
      <body>
        <Header />
        <Toaster />
        <div className="mt-[80px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
