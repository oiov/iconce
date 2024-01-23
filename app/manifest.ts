import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ICONCE",
    short_name: "ICONCE",
    description: "Generate SVG icons in seconds",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
