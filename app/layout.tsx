import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
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

const TITLE = "Artisans Michelet | Artisanat d'exception dans l'Hérault";
const DESCRIPTION =
  "Artisans Michelet, savoir-faire artisanal haut de gamme dans le département 34 (Hérault). Service d'urgence disponible 24h/24, 7j/7.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
      <body className="min-h-full flex flex-col bg-white text-trust-900">
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
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
