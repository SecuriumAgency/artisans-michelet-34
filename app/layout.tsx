import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
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
  "Artisans Michelet, savoir-faire artisanal haut de gamme dans le département 34 (Hérault).";

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
                streetAddress: "ADRESSE_A_COMPLETER",
                addressLocality: "VILLE_A_COMPLETER",
                postalCode: "CODE_POSTAL_A_COMPLETER",
                addressRegion: "Occitanie",
                addressCountry: "FR",
              },
              telephone: "TELEPHONE_A_COMPLETER",
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Hérault (34)",
              },
              priceRange: "€€€",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
