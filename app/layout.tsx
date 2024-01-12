import GoogleAnalytics from "@/app/GoogleAnalytics";
import { NextAuthProvider } from "@/app/providers";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import "@/styles/checkbox.css";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "@/styles/select.css";
import "@/styles/slider.css";
import "@/styles/switch.css";
import { UserInfo } from "@/types/user";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  // themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            {/* <Header user={user} /> */}
            <main className="flex-1 flex justify-center">{children}</main>
            {/* <Footer /> */}
          </NextAuthProvider>
          {/* <Analytics /> */}
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
