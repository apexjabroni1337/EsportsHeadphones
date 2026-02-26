export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://esportsheadphones.com/sitemap.xml",
    host: "https://esportsheadphones.com",
  };
}
