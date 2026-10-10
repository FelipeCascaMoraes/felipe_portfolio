import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "desenvolvedor",
    "inteligência artificial",
    "automações",
    "agentes de IA",
    "CRM",
    "sistemas personalizados",
    "integrações",
    "freelancer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
    >
      <body className="min-h-svh">
        {/* Sem JavaScript, as animações de entrada não rodam: exibe tudo de imediato. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
