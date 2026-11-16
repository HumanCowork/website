import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
 * Brand type is organised in two roles — heading and body — but both currently
 * resolve to the same family: Outfit carries the titles and the running text,
 * and Geist Mono stays on code-like content. The roles remain separate tokens in
 * globals.css, so a second family can be dropped into either slot later without
 * touching a single component. Geist (sans) was removed rather than left
 * declared-but-unused, which was shipping a font nothing rendered.
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Human Cowork · Comunidad Tech Córdoba",
  description:
    "Comunidad abierta de personas que construyen software, agencias, proyectos de inteligencia artificial aplicada y tecnología en Córdoba, Argentina.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
