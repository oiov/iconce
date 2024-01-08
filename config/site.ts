import { SiteConfig } from "@/types/siteConfig";

const baseSiteConfig = {
  name: "LemonPay",
  description:
    "Quickly build a membership subscription SaaS system based on Lemonsquezy",
  url: "https://lemonpay.oihub.cc",
  ogImage: "https://lemonpay.oihub.cc/og.jpg",
  metadataBase: new URL("https://lemonpay.oihub.cc"),
  keywords: ["Payment", "Lemonsqueeze", "Saas", "Subscription", "Platform"],
  authors: [
    {
      name: "yesmore",
      url: "https://github.com/yesmore",
    },
  ],
  creator: "@yesmore",
  // themeColor: "#fff",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  links: {
    twitter: "https://twitter.com/yesmooore",
    github: "https://github.com/yesmore/lemonpay",
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
