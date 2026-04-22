import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://scse.nitjsr.ac.in"),
  title: {
    default: "SCSE - Society of Computer Science & Engineering | NIT Jamshedpur",
    template: "%s | SCSE - NIT Jamshedpur",
  },
  description: "Join SCSE at NIT Jamshedpur for Xavenir '26. Participate in coding competitions, hackathons, and tech events with ₹75K+ prize pool. Register now for 16+ exciting events!",
  keywords: [
    "SCSE",
    "NIT Jamshedpur",
    "Xavenir",
    "Xavenir 2026",
    "Tech Fest",
    "Coding Competition",
    "Hackathon",
    "Computer Science",
    "Engineering",
    "CSE Department",
    "Technical Events",
    "Programming Contest",
    "Web Development",
    "AI ML Hackathon",
    "BGMI Tournament",
    "Quiz Competition",
    "Student Society",
    "Ayush Verma",
    "Priyanshu Raj",
  ],
  authors: [{ name: "SCSE - NIT Jamshedpur" }],
  creator: "SCSE - NIT Jamshedpur",
  publisher: "SCSE - NIT Jamshedpur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "SCSE - NIT Jamshedpur",
    title: "SCSE Xavenir '26 - NIT Jamshedpur",
    description: "Annual tech fest with 16+ events and ₹75K+ prize pool. Join the biggest celebration of technology, innovation, and creativity.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SCSE Xavenir '26 - NIT Jamshedpur Tech Fest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCSE Xavenir '26 - NIT Jamshedpur",
    description: "Join the biggest tech fest at NIT Jamshedpur with 16+ events and ₹75K+ prize pool",
    images: ["/og-image.png"],
    creator: "@scse_nitjsr",
    site: "@scse_nitjsr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Society of Computer Science & Engineering",
    alternateName: "SCSE",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://scse.nitjsr.ac.in",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://scse.nitjsr.ac.in"}/SCSElogo.svg`,
    description: "The Society of Computer Science and Engineering (SCSE) is a dynamic community of tech enthusiasts, innovators, and learners at NIT Jamshedpur.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "National Institute of Technology Jamshedpur",
      alternateName: "NIT Jamshedpur",
    },
    event: {
      "@type": "Event",
      name: "Xavenir 2026",
      description: "Annual tech fest with 16+ events and ₹75K+ prize pool",
      startDate: "2026-04-17",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "NIT Jamshedpur",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jamshedpur",
          addressRegion: "Jharkhand",
          addressCountry: "IN",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "SCSE - NIT Jamshedpur",
        url: process.env.NEXT_PUBLIC_BASE_URL || "https://scse.nitjsr.ac.in",
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}