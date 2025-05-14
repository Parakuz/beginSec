"use client";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Reset link sent! Please check your email.");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161831] to-[#0F0F1E] flex items-center justify-center p-8">
      <div className="bg-[#1E2040] rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-[#2A2E57]">
        <div className="w-full md:w-6/12 bg-[#161831] relative h-64 md:h-auto">
          <Image
            src="/assets/CoverLogin-Regis.png"
            alt="Cybersecurity"
            width={500}
            height={600}
            className="object-cover h-full w-full brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161831]/70 to-[#161831]/40 flex items-center justify-center">
            <div className="text-white text-center p-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-md">
                Password Recovery
              </h2>
              <p className="text-sm md:text-base max-w-xs mx-auto">
                We'll help you get back to securing your digital world
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12 p-10 md:p-14">
          <div className="mb-10">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Forgot Password
            </h1>
            <p className="text-gray-400 text-lg">
              Enter your email to receive password reset instructions
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-white text-lg font-medium text-left block mb-2">
                Email
              </label>
              <div
                className={`${styles.input_group} transition-all duration-300 hover:shadow-md border-[#2A2E57]`}
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`${styles.input_text} bg-[#242851] text-white border-[#2A2E57] focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300 placeholder-gray-500`}
                  required
                />
              </div>
            </div>

            <button
              className={`${styles.button} mt-6 py-3.5 text-lg shadow-lg shadow-[#391A81]/20 hover:shadow-xl hover:shadow-[#391A81]/30 hover:-translate-y-0.5 transition-all duration-300`}
              type="submit"
            >
              Reset Password
            </button>

            {message && (
              <p className="text-green-600 text-center font-medium">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2A2E57]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1E2040] text-gray-400">or</span>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-2">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-[#8A5CF7]  font-medium hover:underline transition-all duration-300"
              >
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
