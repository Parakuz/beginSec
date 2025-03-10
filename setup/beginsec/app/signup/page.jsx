"use client";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { validateRegistration } from "@/utils/formValidation";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateRegistration(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f7] to-[#e8e8ea] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">
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
                Create an Account
              </h2>
              <p className="text-sm md:text-base max-w-xs mx-auto">
                Join our cybersecurity community today
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12 p-8 md:p-10">
          <div className="mb-6">
            <h1 className="text-[#252525] text-2xl md:text-3xl font-bold mb-2">
              Sign Up
            </h1>
            <p className="text-gray-600 text-base">
              Please fill in your information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}{" "}
            <div className="space-y-1">
              <label className="text-[#252525] text-base font-medium text-left block mb-1">
                Name
              </label>
              <div
                className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#252525] text-base font-medium text-left block mb-1">
                Email
              </label>
              <div
                className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#252525] text-base font-medium text-left block mb-1">
                Password
              </label>
              <div
                className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl text-gray-500 hover:text-[#391A81] transition-colors duration-300"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#252525] text-base font-medium text-left block mb-1">
                Confirm Password
              </label>
              <div
                className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl text-gray-500 hover:text-[#391A81] transition-colors duration-300"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>
            </div>
            <button
              className={`${styles.button} mt-4 py-3 text-base shadow-lg shadow-[#391A81]/20 hover:shadow-xl hover:shadow-[#391A81]/30 hover:-translate-y-0.5 transition-all duration-300`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <p className="text-center text-[#929BA4]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#391A81] font-medium hover:underline transition-all duration-300"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
