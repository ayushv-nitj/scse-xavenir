"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const loadRazorpayScript = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
};

interface RegistrationFeesButtonProps {
  email: string;
}

export default function RegistrationFeesButton({
  email,
}: RegistrationFeesButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    setLoading(true);
    try {
      await loadRazorpayScript();

      const { data } = await axios.post("/api/razorpay/registrationFeesOrder");
      if (!data.success) {
        setLoading(false);
        alert("Failed to create order: " + data.message + ". Retry Later");
        return;
      }

      const { order } = data;

      if (!(window as any).Razorpay) {
        setLoading(false);
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
        amount: order.amount,
        currency: order.currency,
        name: "SCSE",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          console.log(response);
          await axios.post("/api/razorpay/verifyRegistrationPayment", {
            ...response,
          });
          alert("Payment successful!");
          // router.refresh();
          setLoading(false);
          window.location.reload();
          router.push("/dashboard");
        },
        prefill: {
          email,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          escape: false, 
          ondismiss: () => {
            console.log("User closed the payment window.");
            setLoading(false);
          },
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", () => setLoading(false));
      rzp1.open();
    } catch (error) {
      setLoading(false);
      console.error("Payment Error:", error);
      alert("Something went wrong. Try later");
    }
  };
  return (
    <>
      <button
        className="w-full mb-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 border border-purple-500/30 mt-5"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Wait..." : "Pay Registration Fees"}
      </button>
    </>
  );
}
