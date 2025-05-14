"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#161831] to-[#0F0F1E] p-8">
      <div className="bg-[#1E2040] p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#2A2E57]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h1>

        {success ? (
          <div className="text-green-500 text-center font-medium bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            Your password has been reset successfully! Redirecting to login page...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-white">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8A5CF7]/30 bg-[#242851] text-white border-[#2A2E57] focus:border-white transition-all duration-300 placeholder-gray-500"
                required
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-white">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8A5CF7]/30 bg-[#242851] text-white border-[#2A2E57] focus:border-white transition-all duration-300 placeholder-gray-500"
                required
                placeholder="Confirm your new password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#391A81] text-white py-3 rounded-md hover:bg-[#6231D5] transition-all duration-300 shadow-lg shadow-[#391A81]/20 hover:shadow-xl hover:shadow-[#391A81]/30 hover:-translate-y-0.5"
            >
              Reset Password
            </button>
            
            <div className="text-center mt-4">
              <a 
                href="/login" 
                className="text-[#8A5CF7] hover:underline transition-all duration-300"
              >
                Back to Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
