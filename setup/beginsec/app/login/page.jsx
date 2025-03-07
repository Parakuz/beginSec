"use client";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f7] to-[#e8e8ea] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">
        {/* Image Section - Top on mobile, Left on desktop */}
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
              <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-md">Welcome Back</h2>
              <p className="text-sm md:text-base max-w-xs mx-auto">Your journey to cybersecurity excellence continues here</p>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-6/12 p-10 md:p-14">
          <div className="mb-10">
            <h1 className="text-[#252525] text-3xl md:text-4xl font-bold mb-4">Login</h1>
            <p className="text-gray-600 text-lg">Please sign in to continue</p>
          </div>

          <form className="flex flex-col gap-6">
            <div className="space-y-1">
              <label className="text-[#252525] text-lg font-medium text-left block mb-2">
                Email
              </label>
              <div className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="mb-2">
                <label className="text-[#252525] text-lg font-medium">
                  Password
                </label>
              </div>
              <div className={`${styles.input_group} transition-all duration-300 hover:shadow-md`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className={`${styles.input_text} focus:border-[#391A81] focus:ring-2 focus:ring-[#391A81]/30 transition-all duration-300`}
                />
                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl text-gray-500 hover:text-[#391A81] transition-colors duration-300" onClick={togglePasswordVisibility}>
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>
              <div className="text-right mt-1">
                <a href="/forgotpassword" className="text-[#391A81] text-sm hover:underline transition-all duration-300">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button className={`${styles.button} mt-6 py-3.5 text-lg shadow-lg shadow-[#391A81]/20 hover:shadow-xl hover:shadow-[#391A81]/30 hover:-translate-y-0.5 transition-all duration-300`} type="submit">
              Login
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <p className="text-center text-[#929BA4] mt-2">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#391A81] font-medium hover:underline transition-all duration-300">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}