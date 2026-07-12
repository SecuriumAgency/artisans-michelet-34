import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BackgroundCanvasLoader } from "@/components/three/BackgroundCanvasLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE = "Artisans Michelet | Plombier & Serrurier dans l'Hérault (34)";
const DESCRIPTION =
  "Artisans Michelet : plombier et serrurier qualifiés dans l'Hérault (34). Dépannage, installation, ouverture de porte. Intervention rapide 24h/24 et 7j/7, devis transparent, garantie décennale.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Artisans Michelet",
  },
  description: DESCRIPTION,
  keywords: [
    "plombier Hérault",
    "serrurier Hérault",
    "plombier Montpellier",
    "serrurier Montpellier",
    "dépannage plomberie 34",
    "artisan serrurier urgence",
  ],
  authors: [{ name: "Artisans Michelet" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Artisans Michelet",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Artisans Michelet — Plombier & Serrurier dans l'Hérault",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col overflow-x-hidden bg-transparent text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Artisans Michelet",
              description: DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                streetAddress: "1 Rue de la République",
                addressLocality: "Montpellier",
                postalCode: "34000",
                addressRegion: "Occitanie",
                addressCountry: "FR",
              },
              telephone: "04 11 93 96 74",
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Hérault (34)",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "€€€",
            }),
          }}
        />
        <SmoothScroll />
        <Header />
        <BackgroundCanvasLoader />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="AW-1849890923" />
      </body>
    </html>
  );
}
