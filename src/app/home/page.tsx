import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home SCSE",
  description: "Home SCSE",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg",
    shortcut: "/SCSElogo.svg",
  },
};

export default function Page() {
  return redirect("/");
}