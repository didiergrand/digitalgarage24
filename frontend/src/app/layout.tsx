import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  weight: ['200','400','700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Digitalgarage – Didier Grand - Création web et stratégie digitale",
  description: "Gestion de projets web, développement, UI/UX design, réseaux sociaux. Avec plus de 20 ans d'expérience dans le domaine du web, je maîtrise un large éventail de compétences nécessaires pour créer des sites web de A à Z. Actuellement développeur front-end chez Scott Sports, je mets à profit mes compétences en webdesign, graphisme, photographie pour des projets personnels ou des mandats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <main className="flex bg-dg-50 min-h-screen flex-col">
          <Header />
          <div>
            {children}
          </div>
        </main>
        <Footer/>
        <Analytics/>
      </body>
    </html>
  );
}
