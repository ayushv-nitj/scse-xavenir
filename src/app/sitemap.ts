import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://scse.nitjsr.ac.in";
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/events",
    "/contact",
    "/gallery",
    "/sponsors",
    "/leaderboard",
    "/login",
    "/register",
    "/dashboard",
    "/privacy",
    "/terms",
    "/refund",
    "/shipping",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Event pages - add your event slugs here
  const events = [
    "Quiz-o-Compute",
    "Pixel Sync",
    "Mini Carnival Zone",
    "Debug and Discover",
    "Web Hackathon",
    "Binary Blitz",
    "Ideathon",
    "BGMI Tournament",
    "AI ML Hackathon",
    "CodeZenith (CP Contest)",
    "Movie Mania",
    "Paper Dance",
    "Golgappa Challenge",
    "Social Media Challenge",
  ];

  const eventPages = events.map((event) => ({
    url: `${baseUrl}/eventDetails/${encodeURIComponent(event)}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...eventPages];
}
