import type { Metadata } from "next";
import ResetPassword from "./resetpage";

export const metadata: Metadata = {
  title: "Reset Password // SCSE — Secure Access",
  description: "Reset Password page SCSE",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg",
    shortcut: "/SCSElogo.svg",
  },
};

export default async function Reset({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;

  return (
    <ResetPassword
      token={token}
      email={email}
    />
  );
}