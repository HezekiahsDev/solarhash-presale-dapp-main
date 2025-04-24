import { ReactNode } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WalletProviderWrapper from "./WalletProviderWrapper";
import Script from "next/script";
import Analytics from "./components/Analytics";

const GA_MEASUREMENT_ID = "G-4P0BYZDPVV"; // 🔁 Replace with your GA4 ID

export const metadata = {
  title: "Solar Hash Token",
  description:
    "Bridging the gap between crypto mining and sustainable ecosystem",
  keywords: [
    "Solar",
    "Mining",
    "SHTP",
    "Sustainable Energy",
    "dApp",
    "Web3",
    "Blockchain",
    "Next.js",
  ],
  authors: [{ name: "Solar Hash" }],
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords?.join(", ")} />
        <meta name="author" content={metadata.authors?.[0].name} />

        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="h-full">
        <WalletProviderWrapper>
          {/* Track route changes */}
          <Analytics />

          <div>
            <Header />
            <main className="h-fit items-center justify-center">
              {children}
            </main>
            <Footer />
          </div>
        </WalletProviderWrapper>
      </body>
    </html>
  );
}
