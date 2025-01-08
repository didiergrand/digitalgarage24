import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { headers } from 'next/headers';

const inter = Inter({
  weight: ['200','400','700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: "Digitalgarage – Didier Grand",
    template: "%s | Digitalgarage"
  },
  description: "Gestion de projets web, développement, UI/UX design, réseaux sociaux. Avec plus de 20 ans d'expérience dans le domaine du web, je maîtrise un large éventail de compétences nécessaires pour créer des sites web de A à Z. Actuellement développeur front-end chez Scott Sports, je mets à profit mes compétences en webdesign, graphisme, photographie pour des projets personnels ou des mandats.",
  metadataBase: new URL('https://www.digitalgarage.ch'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const domain = "https://www.digitalgarage.ch";
  const path = headersList.get("x-invoke-path") || "";
  const canonicalUrl = `${domain}${path}`;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col">
          <Header />
            {children}
        </main>
        <Footer/>
        <Analytics/>
      </body>
    </html>
  );
}
