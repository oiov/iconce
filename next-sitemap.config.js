/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: "https://iconce.com",
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/server-sitemap.xml", "/404"],
  generateRobotsTxt: true,
  sitemapSize: 5000, // 站点超过5000个，拆分到多个文件
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    // 这个版本的next-sitemap无法把app router的静态目录加载进来，所以在这里手动添加了
    await config.transform(config, "/"),
  ],
  robotsTxtOptions: {
    additionalSitemaps: ["https://iconce.com/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
    ],
  },
};
