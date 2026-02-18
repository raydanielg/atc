import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arusha Technical College",
    short_name: "ATC",
    description: "Arusha Technical College (ATC)",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B5ED7",
    icons: [
      {
        src: "/atc%20logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/emblem.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
