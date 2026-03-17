"use client";

import { useState } from "react";

export default function Register() {

  const [loading,setLoading] = useState(false);

  const handleGoogleRegister = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const googleAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=email profile` +
      `&access_type=online`;

    window.location.href = googleAuthURL;
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-gray-900 p-10 rounded-xl w-[400px] space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <button
          onClick={handleGoogleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg"
        >
          Continue with Google
        </button>

        <p className="text-gray-400 text-center">
          After Google verification you will complete registration.
        </p>

      </div>

    </main>
  );
}