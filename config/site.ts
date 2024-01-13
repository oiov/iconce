import { SiteConfig } from "@/types/siteConfig";

const baseSiteConfig = {
  name: "ICONCE - Generate SVG icons in seconds",
  description: "Generate SVG icons in seconds",
  url: "https://iconce.com",
  ogImage: "https://iconce.com/og.jpg",
  metadataBase: new URL("https://iconce.com"),
  keywords: [
    "SVG",
    "icon",
    "generator",
    "gif",
    "Platform",
    "SVG generator",
    "SVG animation",
    "SVG synthesizer",
    "png",
    "svg to png",
  ],
  authors: [
    {
      name: "yesmore",
      url: "https://github.com/yesmore",
    },
  ],
  creator: "@yesmore",
  // themeColor: "#fff",
  icons: {
    icon: "/ce.svg",
    shortcut: "/ce.svg",
    apple: "/ce.svg",
  },
  links: {
    twitter: "https://twitter.com/yesmooore",
    github: "https://github.com/yesmore/iconce",
  },
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};
