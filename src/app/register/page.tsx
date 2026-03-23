import type { Metadata } from "next";
import RegisterPage from "./rpage";

export const metadata: Metadata = {
  title: "RegisterPage - SCSE",
  description: "Register to the SCSE",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function Register() {
  return < RegisterPage/>;
}
