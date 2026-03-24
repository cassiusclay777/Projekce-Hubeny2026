import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://projekce-hubeny.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Ing. Radim Hubený | Autorizovaný projektant pozemních staveb",
    template: "%s | Ing. Radim Hubený",
  },
  description:
    "Projektant staveb Moravský Krumlov a jižní Morava. Rodinné domy, bytová výstavba, zdravotnická a školská zařízení, výrobní haly. Stavební a autorský dozor, dotace NZÚ, prověření nemovitosti před koupí.",
  keywords: [
    "projektant staveb",
    "projekční kancelář",
    "rodinné domy",
    "projektování",
    "stavební dozor",
    "autorský dozor",
    "Moravský Krumlov",
    "jižní Morava",
    "dotace NZÚ",
    "zpracování dotací",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "Projekce Hubený",
    title: "Ing. Radim Hubený | Autorizovaný projektant pozemních staveb",
    description:
      "Projektová a inženýrská činnost, dozory, dotace NZÚ, prověření nemovitostí. Moravský Krumlov a okolí.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ing. Radim Hubený – projekční činnost",
  description:
    "Autorizovaný projektant pozemních staveb. Projekce, dozory, dotace NZÚ.",
  url: siteUrl,
  telephone: "+420737424288",
  email: "info@projekce-hubeny.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nerudova 803",
    addressLocality: "Moravský Krumlov",
    postalCode: "672 01",
    addressCountry: "CZ",
  },
  areaServed: "Jižní Morava",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
