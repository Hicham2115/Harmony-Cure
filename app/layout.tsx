import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harmonycure.fr"),
  title: {
    default: "Harmony Cure | Soins capillaires naturels fabriqués en France",
    template: "%s | Harmony Cure",
  },
  description:
    "Harmony Cure conçoit des soins naturels anti-chute, collagène marin et compléments minceur, formulés et fabriqués en France. Résultats cliniquement prouvés.",
  keywords: [
    "Harmony Cure",
    "soins capillaires naturels",
    "anti chute de cheveux",
    "collagène marin",
    "brûle graisses naturel",
    "coupe faim naturel",
    "cure cheveux",
    "cosmétique française",
  ],
  authors: [{ name: "Harmony Cure" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harmony Cure | L'harmonie de la nature",
    description:
      "Des soins naturels, efficaces et sensoriels, fabriqués en France. Découvrez nos cures anti-chute, collagène marin et minceur.",
    url: "https://harmonycure.fr",
    siteName: "Harmony Cure",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/videos/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Harmony Cure - soins naturels fabriqués en France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Cure | L'harmonie de la nature",
    description:
      "Des soins naturels, efficaces et sensoriels, fabriqués en France.",
    images: ["/videos/hero-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
