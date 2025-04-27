"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/contexts/sessionContext";
import NavBtn from "./reuseable/Nav_btn";
import { useRouter } from "next/navigation";

function Navbar() {
  const { isAuthenticated, checkSession, loading, user } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await checkSession();
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSetting = () => {
    router.push("/profile/profilesetting");
  };
  // if (loading) {
  //   return (
  //     <nav className="bg-[#252525]/60 text-white px-6 py-4">Loading...</nav>
  //   );
  // }

  return (
    <nav className="bg-[#252525]/60 text-white px-6 py-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-6 ml-40">
        <img src="/homepage/logo.png" alt="Logo" className="h-10 w-auto" />
        <NavBtn des="/">Home</NavBtn>
        <NavBtn des="/learning-path">Learning Path</NavBtn>
        <NavBtn des="/blog">Blog</NavBtn>
        <NavBtn des="/contact">Contact</NavBtn>
      </div>

      <div className="flex items-center space-x-6 mr-40 relative">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:opacity-80 transition"
            >
              <img
                src={
                  user?.imagePath ||
                  "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl text-sm text-gray-800 z-50">
                <div className="p-4 border-b">
                  <p className="font-semibold">{user?.name || "Singchai"}</p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "user@mail.com"}
                  </p>
                </div>
                <ul>
                  <li>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      👤 Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSetting}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ⚙️ Account Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      🚪 Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
