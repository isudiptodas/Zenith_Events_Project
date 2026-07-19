import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.zefc.in",
      lastModified: new Date(),
    },
    {
      url: "https://www.zefc.in/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.zefc.in/services",
      lastModified: new Date(),
    },
    {
      url: "https://www.zefc.in/contact",
      lastModified: new Date(),
    },
    {
      url: "https://www.zefc.in/events",
      lastModified: new Date(),
    },
    {
      url: "https://www.zefc.in/helpdesk",
      lastModified: new Date(),
    },
  ];
}