"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

interface RegisterForEventProps {
  eventName: string; // e.g. "Hackathon"
  maxPart: number; // e.g. 5
  minPart: number; // e.g. 2
  regFees: number;
}

interface ApiResponse {
  error?: string;
  message?: string;
}

const loadRazorpayScript = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
};

export default function RegisterForEvent({
  eventName,
  regFees,
  maxPart,
  minPart,
}: RegisterForEventProps) {
  const router = useRouter();

  // Existing states
  const [payer, setPayer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Using empty string instead of null
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>(
    Array(minPart).fill("")
  );
  const [teamName, setTeamName] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  // New states for image upload
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // New states for transaction IDs
  const [transactionId1, setTransactionId1] = useState("");
  const [transactionId2, setTransactionId2] = useState("");
  const [transactionId3, setTransactionId3] = useState("");

  // Helper to show/hide modal
  const showModal = (
    title: string,
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  // Overlay open/close
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  // Participant fields
  const handleAddParticipant = () => {
    if (participants.length < maxPart) {
      setParticipants((prev) => [...prev, ""]);
    }
  };
  const handleRemoveParticipant = (index: number) => {
    if (participants.length > minPart) {
      setParticipants((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
  };
  const handleParticipantChange = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value.trim();
    setParticipants(updated);
  };

  // Payment flow
  const handlePayment = async () => {
    setLoading(true);
    try {
      await loadRazorpayScript();
      const response = await axios.post("/api/razorpay/eventFeesOrder", {
        eventName,
      });
      const data = await response.data;
      if (!data.success) {
        setLoading(false);
        alert("Failed to create order: " + data.message);
        setError("Please try later");
        return;
      }
      const { order } = data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
        amount: order.amount,
        currency: order.currency,
        name: "SCSE",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          alert("Payment successful! See your registration in dashboard");
          router.push("/dashboard");
          console.log(response);
          const formData = {
            teamName,
            members: participants,
            eventName,
          };
          await axios.post("/api/razorpay/verifyEventPayment", {
            ...response,
            ...formData,
            eventName,
          });
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

  // Main form submit
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!teamName.trim()) {
      setLoading(false);
      alert("Please enter a team name.");
      return;
    }

    console.log("Team Name:", teamName);
    console.log("Participants:", participants);

    const formData = {
      teamName,
      members: participants,
      eventName,
    };

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/registerForEvent",
        formData
      );

      if (response.status === 200) {
        // Success
        showModal("Registration Successful", `SUCCESS.`, "success");
        setTeamName("");
        setParticipants([""]);
        setIsOverlayOpen(false);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        const status = err.response.status;

        if (status === 420) {
          const data: ApiResponse = err.response.data;
          setError(data.error || data.message || "Paisa dena hoga bhai.");
          if (typeof window !== "undefined") {
            document.body.style.overflowY = "auto";
            document.querySelectorAll(".kalaman").forEach((el) => {
              (el as HTMLElement).style.maxHeight = "180vh"; // Change max-height
            });
          }
          setPayer(true);
        } else {
          const data: ApiResponse = err.response.data;
          setError(data.error || data.message || "Unknown error occurred.");
        }
      } else {
        setLoading(false);
        setError(err.message || "Network error occurred.");
      }
    }
  };

  // ======== NEW FUNCTIONS FOR IMAGE UPLOAD & NON-PRIME SUBMISSION ========
  const handleImageUpload = async () => {
    setError("");
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    try {
      const response = await axios.post(`/api/cloudinary/upload`, data);
      setImageUrl(response.data.uploads.file.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNonPrimeNitianSubmit = async () => {
    // Log all details including transaction IDs
    console.log("Event Name:", eventName);
    console.log("Team Name:", teamName);
    console.log("Participants:", participants);
    console.log("Image URL:", imageUrl);
    console.log("Transaction ID 1 (required):", transactionId1);
    console.log("Transaction ID 2 (optional):", transactionId2);
    console.log("Transaction ID 3 (optional):", transactionId3);

    // Prepare the data to send to the API endpoint
    const requestData = {
      eventName,
      teamName,
      members: participants,
      paymentProof: imageUrl,
      transactionId1,
      transactionId2,
      transactionId3,
    };

    try {
      const response = await axios.post(
        "/api/payAndRegisterForEvent",
        requestData
      );
      alert("As we will verify, you will se it in dashboard");
      router.push("/events");
    } catch (error) {
      setError("Fill the details properly or try again later");
      console.log("Registration failed:", error);
    }
  };

  // ======================================================================
  return (
    <div>
      <button
        onClick={() => {
          handleOpenOverlay();
          window.scrollTo(0, 0);
          document.body.style.overflowY = "hidden";
        }}
        className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer"
      >
        Register for {eventName}
      </button>

      {isOverlayOpen && (
        <div className="fixed kalaman inset-0 z-50 flex max-h-[100vh] flex-wrap md:flex-nowrap items-center justify-center bg-black/90 p-8">
          <div className="rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => {
                handleCloseOverlay();
                document.body.style.overflowY = "auto";
              }}
              className="hidden md:inline-block absolute right-4 top-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              Close✕
            </button>
            <button
              onClick={() => {
                handleCloseOverlay();
                document.body.style.overflowY = "auto";
              }}
              className="md:hidden absolute right-4 top-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              ✕
            </button>

            <h2 className="mb-4 text-xl font-bold">Register for {eventName}</h2>

            {error && (
              <p className="mb-4 rounded bg-red-100 p-2 text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block font-medium">
                  Team Name (Required):
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              {participants.map((value, i) => (
                <div key={i} className="mb-4">
                  <label className="mb-1 block font-medium">
                    Participant {i + 1} (SCSE-xxxxxxx)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="SCSE-1234567"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={value}
                      onChange={(e) =>
                        handleParticipantChange(i, e.target.value)
                      }
                      required
                    />
                    {participants.length > minPart && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(i)}
                        className="rounded bg-red-600 px-2 py-1 font-semibold text-white hover:bg-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {participants.length < maxPart && (
                <button
                  type="button"
                  onClick={handleAddParticipant}
                  className="mr-2 rounded bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-700 cursor-pointer"
                >
                  + Add Participant
                </button>
              )}

              <button
                type="submit"
                className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Wait..." : "Register"}
              </button>
            </form>
          </div>

          {/* 
            When `payer` is true, show the extra section for uploading an image,
            transaction inputs, and a final submit button.
          */}
          {payer && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <img src="/scseqr.png" alt="SCSE QR" className="h-60 w-60" />
              <p>Pay ₹{regFees}</p>
              {error && <p className="text-red-500">{error}</p>}

              <input
                type="file"
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-white file:text-white file:bg-gradient-to-r file:from-blue-500 file:to-purple-600"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />

              <button
                onClick={handleImageUpload}
                className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  "Uploading..."
                ) : imageUrl ? (
                  <span className="text-green-300">Uploaded</span>
                ) : (
                  "Upload"
                )}
              </button>

              {/* Transaction ID inputs */}
              <div className="w-full flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Transaction ID 1 (Required)"
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={transactionId1}
                  onChange={(e) => setTransactionId1(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Transaction ID 2 (Optional)"
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={transactionId2}
                  onChange={(e) => setTransactionId2(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Transaction ID 3 (Optional)"
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={transactionId3}
                  onChange={(e) => setTransactionId3(e.target.value)}
                />
              </div>

              <button
                onClick={handleNonPrimeNitianSubmit}
                className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 cursor-pointer"
              >
                Final Submit
              </button>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
}
