import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/newsletter-shared-url";
import { SHARE_IMAGES, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, organizationJsonLd, shareImage } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Polymata | Sites, sistemas, gestão e rede empresarial em São Paulo",
    template: "%s | Polymata",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Polymata", url: SITE_URL }],
  creator: "Polymata",
  publisher: "Polymata",
  category: "business",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    url: SITE_URL,
    title: "Polymata | Ecossistema empresarial em São Paulo",
    description: SITE_DESCRIPTION,
    images: [shareImage(SHARE_IMAGES.home)],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polymata | Ecossistema empresarial em São Paulo",
    description: SITE_DESCRIPTION,
    images: [shareImage(SHARE_IMAGES.home)],
  },
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São Paulo",
    "content-language": "pt-BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
