"use client";
import Layout from "@/layout/layoutLoginRegis";
import Head from "next/head";
import styles from "@/styles/Form.module.css";
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Layout backgroundImage="/assets/login-background.jpg">
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-8">
        <div className="title">
          <div className="text-[#252525] text-[25px] font-bold font-['Satoshi'] text-left">
            Login
          </div>
        </div>
        <form className="flex flex-col gap-3">
          <label className="text-[#252525] text-xl font-normal text-left">
            Email
          </label>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`${styles.input_text} focus:border-[#391A81] focus:ring-1 focus:ring-[#391A81]`}
            />
          </div>
          <label className="text-[#252525] text-xl font-normal text-left">
            Password
          </label>
          <div className={`${styles.input_group} relative`}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className={`${styles.input_text} focus:border-[#391A81] focus:ring-1 focus:ring-[#391A81]`}
            />
            <p
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-2xl text-gray-500 hover:text-[#391A81]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </p>
          </div>
          <div className="text-right">
            <a href="/forgot-password" className="text-[#391A81] hover:underline">
              Forgot Password?
            </a>
          </div>
          <button className={`${styles.button} mt-4`} type="submit">
            Log In
          </button>
          <p className="text-center text-[#929BA4]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#391A81]">
              Sign Up
            </a>
          </p>
        </form>
      </section>
    </Layout>
  );
}