"use client";

import { useEffect } from "react";
import { useSession } from "@/contexts/sessionContext";
import NavBtn from "./reuseable/Nav_btn";
import { useRouter } from "next/navigation";

function Navbar() {
  const { isAuthenticated, checkSession, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await checkSession();
    router.push("/");
  };

  if (loading) {
    return (
      <nav className="bg-[#252525]/60 text-white px-6 py-4">Loading...</nav>
    );
  }

  return (
    <nav className="bg-[#252525]/60 text-white px-6 py-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-6 ml-40">
        <img src="/homepage/logo.png" alt="Logo" className="h-10 w-auto" />
        <NavBtn des="/">Home</NavBtn>
        <NavBtn des="/learning-path">Learning Path</NavBtn>
        <NavBtn des="/blog">Blog</NavBtn>
        <NavBtn des="/contact">Contact</NavBtn>
      </div>
      <div className="flex items-center space-x-6 mr-40">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-[#391A81] text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Logout
          </button>
        ) : (
          <>
            <NavBtn des="/login">Login</NavBtn>
            <NavBtn
              des="/signup"
              customClass="bg-[#391A81] text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Sign Up
            </NavBtn>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
