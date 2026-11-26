import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Narrow, Big_Shoulders } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const bigShoulders = Big_Shoulders({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-big-shoulders" });
const archivoNarrow = Archivo_Narrow({ subsets: ["latin"], weight: "variable", style: ["normal", "italic"], variable: "--font-archivo-narrow" });
const archivo = Archivo({ subsets: ["latin"], weight: "variable", style: ["normal", "italic"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: {
    default: "Légion étrangère, une histoire depuis 1831",
    template: "%s · Légion étrangère, une histoire",
  },
  description:
    "Une carte interactive pour découvrir, comprendre et transmettre l'histoire de la Légion étrangère : campagnes, batailles, régiments et grandes figures.",
};

export const viewport: Viewport = {
  themeColor: "#262e36",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bigShoulders.variable} ${archivoNarrow.variable} ${archivo.variable}`}>
      <body className="min-h-svh">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Providers>
          <SiteHeader />
          <main id="contenu">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
