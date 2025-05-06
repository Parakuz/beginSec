"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/contexts/sessionContext";

import {
  MdSensorDoor,
  MdOutlinePhotoCamera,
  MdOutlineEdit,
  MdOutlineNotifications,
  MdOutlinePrivacyTip,
  MdOutlineShield,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaUpload,
  FaPhone,
  FaCalendarAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import NavbarSection from "@/components/homepage/navbar-section";

export default function ProfileSettingsPage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [saveStatus, setSaveStatus] = useState(null);

  // เพิ่ม state สำหรับการเปลี่ยนรหัสผ่าน
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // เพิ่ม state เพื่อเก็บค่าเริ่มต้นและตรวจสอบการเปลี่ยนแปลง
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    telephone: "",
    dob: "",
    email: "",
    country: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const { user } = useSession();
  const userName = user?.name;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!currentUserId) return;

    async function fetchPosttestScores() {
      try {
        const response = await fetch(`/api/user/posttest/${currentUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch scores");
        }
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        console.error("Error fetching scores:", err);
        setError(err.message);
      }
    }

    fetchPosttestScores();
  }, [currentUserId]);

  useEffect(() => {
    if (user) {
      const name = user.name || "";
      const phone = user.telephone || "";
      const birthDate = user.dob
        ? new Date(user.dob).toISOString().split("T")[0]
        : "";
      const userEmail = user.email || "";

      // ตั้งค่าข้อมูลปัจจุบัน
      setFullName(name);
      setTelephone(phone);
      setDob(birthDate);
      setEmail(userEmail);
      setCountry("Thailand"); // ตั้งค่าเป็น Thailand เสมอ

      // บันทึกค่าเริ่มต้น
      setInitialValues({
        fullName: name,
        telephone: phone,
        dob: birthDate,
        email: userEmail,
        country: "Thailand", // ตั้งค่าเริ่มต้นเป็น Thailand เสมอ
      });
    }
  }, [user]);

  // ตรวจสอบการเปลี่ยนแปลงของฟอร์ม
  useEffect(() => {
    if (
      fullName !== initialValues.fullName ||
      telephone !== initialValues.telephone ||
      dob !== initialValues.dob ||
      email !== initialValues.email ||
      country !== initialValues.country
    ) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  }, [fullName, telephone, dob, email, country, initialValues]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();
        setCurrentUserId(data.userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFeedback("❌ Error fetching user data.");
      }
    };

    fetchUserId();
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId.toString(),
          fullName,
          telephone,
          dob,
          email,
          country,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update");
      }

      // อัปเดตค่าเริ่มต้นหลังจากบันทึกสำเร็จ
      setInitialValues({
        fullName,
        telephone,
        dob,
        email,
        country,
      });
      setIsFormChanged(false);

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error(error?.message || "An error occurred during save");
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // เพิ่มฟังก์ชันสำหรับการยกเลิกการแก้ไข
  const handleCancel = () => {
    setFullName(initialValues.fullName);
    setTelephone(initialValues.telephone);
    setDob(initialValues.dob);
    setEmail(initialValues.email);
    setCountry("Thailand"); // ตั้งค่าเป็น Thailand เสมอ
    setIsFormChanged(false);
  };

  // เพิ่มฟังก์ชันสำหรับการเปลี่ยนรหัสผ่าน
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // รีเซ็ตข้อความแจ้งเตือน
    setPasswordError("");
    setPasswordSuccess(false);

    // ตรวจสอบว่ารหัสผ่านใหม่และยืนยันรหัสผ่านตรงกันหรือไม่
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch("/api/user/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId.toString(),
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // รีเซ็ตฟอร์ม
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess(true);

      // ซ่อนข้อความสำเร็จหลังจาก 3 วินาที
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError(
        error.message || "An error occurred while changing password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161831] to-[#0c0e1d]">
      {/* <Navbar /> */}

      {/* Profile Header Section */}
      <div className="relative w-full bg-[#252525]/20 overflow-hidden">
        {/* Removed gradient overlay divs */}

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-[#242851] shadow-lg shadow-purple-900/20">
              {userName?.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="text-white text-3xl md:text-5xl font-bold mb-4 text-left">
                {userName}
              </div>

              <div className="text-purple-300 text-sm md:text-base mb-6">
                Cybersecurity Enthusiast • Learning Path: Beginner
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Completed rooms</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-white">
                      <MdSensorDoor />
                    </div>
                    <span className="text-xl">{count}</span>
                  </div>
                </div>

                <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Badges</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-purple">
                      <TbBadgesFilled />
                    </div>
                    <span className="text-xl">{count}</span>
                  </div>
                </div>

                {/* <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Certificate</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-white">
                      <PiCertificateFill />
                    </div>
                    <span className="text-xl">0</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <NavbarSection />

        <div className="text-white mt-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MdOutlineEdit className="text-white" /> Profile Settings
            </h2>

            <div className="flex items-center mt-4 md:mt-0">
              {saveStatus === "saving" && (
                <span className="text-yellow-400 flex items-center gap-2 mr-4">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving changes...
                </span>
              )}

              {saveStatus === "saved" && (
                <span className="text-green-400 flex items-center gap-2 mr-4">
                  <MdOutlineCheckCircle />
                  Changes saved successfully!
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="w-full lg:w-1/4">
              <div className="bg-[#242851]/80 rounded-xl overflow-hidden backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-[#3a3f6a]/50">
                  <h3 className="font-bold text-lg">Settings</h3>
                </div>

                <nav className="p-2">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                      activeTab === "personal"
                        ? "bg-purple-600/20 text-purple-300 border-l-4 border-purple-500"
                        : "hover:bg-[#1e2142]/70"
                    }`}
                  >
                    <FaUser
                      className={
                        activeTab === "personal" ? "text-purple-400" : ""
                      }
                    />
                    <span>Personal Information</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                      activeTab === "security"
                        ? "bg-purple-600/20 text-purple-300 border-l-4 border-purple-500"
                        : "hover:bg-[#1e2142]/70"
                    }`}
                  >
                    <FaLock
                      className={
                        activeTab === "security" ? "text-purple-400" : ""
                      }
                    />
                    <span>Security</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                      activeTab === "profile"
                        ? "bg-purple-600/20 text-purple-300 border-l-4 border-purple-500"
                        : "hover:bg-[#1e2142]/70"
                    }`}
                  >
                    <MdOutlinePhotoCamera
                      className={
                        activeTab === "profile" ? "text-purple-400" : ""
                      }
                    />
                    <span>Profile Picture</span>
                  </button>
                </nav>

              </div>
            </div>

            {/* Right Side - Content Area */}
            <div className="w-full lg:w-3/4">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="bg-[#242851]/80 rounded-xl p-6 backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-[#3a3f6a]/50 flex items-center gap-2">
                    <FaUser className="text-white" /> Personal Information
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                        />
                      </div>

                      {/* เพิ่มแถวใหม่สำหรับ Email และ Country */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 flex items-center gap-2 text-white">
                            <FaEnvelope /> Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 flex items-center gap-2 text-white">
                            <FaPhone /> Phone Number
                          </label>
                          <input
                            type="tel"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                            placeholder="+1 (123) 456-7890"
                          />
                        </div>
                      </div>

                      {/* จัดให้ Phone Number และ Date of Birth อยู่ในแถวเดียวกัน */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 flex items-center gap-2 text-white">
                            <FaCalendarAlt /> Date of Birth
                          </label>
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 flex items-center gap-2 text-white">
                            Country
                          </label>
                          <input
                            type="text"
                            value="Thailand"
                            disabled
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all opacity-80 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      {/* แสดงปุ่ม Cancel เฉพาะเมื่อมีการเปลี่ยนแปลง */}
                      {isFormChanged && (
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="bg-[#242851]/80 rounded-xl p-6 backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-[#3a3f6a]/50 flex items-center gap-2">
                    <FaLock className="text-white" /> Security Settings
                  </h3>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-white">
                      Change Password
                    </h4>
                    <form className="space-y-4" onSubmit={handleChangePassword}>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#161831] rounded-lg py-3 px-4 text-white border border-[#3a3f6a] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      {passwordError && (
                        <div className="text-red-500 text-sm">
                          {passwordError}
                        </div>
                      )}

                      {passwordSuccess && (
                        <div className="text-green-500 text-sm flex items-center gap-2">
                          <MdOutlineCheckCircle />
                          Password changed successfully!
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={passwordLoading}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                          {passwordLoading ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Changing password...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Profile Picture Tab */}
              {activeTab === "profile" && (
                <div className="bg-[#242851]/80 rounded-xl p-6 backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-[#3a3f6a]/50 flex items-center gap-2">
                    <MdOutlinePhotoCamera className="text-purple-400" /> Profile
                    Picture
                  </h3>

                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative w-48 h-48 mb-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full overflow-hidden border-4 border-[#3a3f6a] shadow-lg shadow-purple-900/20">
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                        {userName.charAt(0)}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                        <FaCamera className="text-white text-3xl" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                      <label className="w-full">
                        <div className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer gap-2">
                          <FaUpload /> Upload New Photo
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>

                      <button className="w-full px-6 py-3 bg-[#1e2142] text-white rounded-lg hover:bg-[#282d57] transition-colors border border-[#3a3f6a]">
                        Remove Photo
                      </button>

                      <p className="text-sm text-gray-400 mt-3 text-center">
                        Recommended: Square JPG, PNG. <br />
                        Maximum size 2MB.
                      </p>
                    </div>

                    <div className="mt-12 w-full">
                      <h4 className="text-lg font-semibold mb-4 text-purple-200">
                        Avatar Gallery
                      </h4>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-lg bg-[#1e2142] border border-[#3a3f6a] overflow-hidden cursor-pointer hover:border-purple-500 transition-all"
                          >
                            <img
                              src={`/assets/avatar-${i}.png`}
                              alt={`Avatar option ${i}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/assets/default-avatar.png";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-[#242851]/80 rounded-xl p-6 backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-[#3a3f6a]/50 flex items-center gap-2">
                    <MdOutlineNotifications className="text-purple-400" />{" "}
                    Notification Settings
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Receive email notifications about course updates and
                          achievements
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Course Reminders
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Get reminders about courses you haven't completed
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">New Courses</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Be notified when new courses are available
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Security Alerts
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Receive notifications about security-related events
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Marketing Communications
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Receive updates about special offers and promotions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div className="bg-[#242851]/80 rounded-xl p-6 backdrop-blur-sm border border-[#3a3f6a]/50 shadow-lg shadow-black/10">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-[#3a3f6a]/50 flex items-center gap-2">
                    <MdOutlinePrivacyTip className="text-purple-400" /> Privacy
                    Settings
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Profile Visibility
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Control who can see your profile information
                        </p>
                      </div>
                      <select className="bg-[#161831] rounded-lg py-2 px-3 text-white border border-[#3a3f6a] focus:border-purple-500 focus:outline-none">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Show Learning Progress
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Allow others to see your course progress
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">
                          Show Achievements
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Display your badges and certificates on your profile
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#1e2142] rounded-lg border border-[#3a3f6a]/50">
                      <div>
                        <p className="font-medium text-white">Data Usage</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Allow us to use your data to improve our services
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-red-900/20 border border-red-900/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-red-400">
                      Danger Zone
                    </h4>
                    <p className="text-sm text-gray-300 mt-1 mb-4">
                      These actions are permanent and cannot be undone
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-4 py-2 bg-[#1e2142] hover:bg-[#282d57] text-white rounded-lg transition-colors border border-[#3a3f6a]">
                        Download My Data
                      </button>
                      <button className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-lg transition-colors border border-red-900/30">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button - Fixed at bottom for all tabs */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
