import LeaderboardPage from "./leaderboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard - SCSE",
  description: "Leaderboard page ",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function Page() {
  return <LeaderboardPage />;
}
