// import { withContentlayer } from "next-contentlayer";
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com", "iconce.com", "img.aoau.top"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/yesmore/iconce",
        permanent: false,
      },
    ];
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, "canvas", "jsdom"];
  //   return config;
  // },
  transpilePackages: ["lucide-react"],
};

// export default withContentlayer(nextConfig)
module.exports = withContentlayer(nextConfig);
