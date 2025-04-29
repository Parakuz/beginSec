"use client";
import { useEffect, useState } from "react";
import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
// import Navbar from "../components/homepage/Navbar";
// import Footer from "../components/homepage/Footer";
import NavbarSection from "@/components/homepage/navbar-section";
// ปิด import เหล่านี้ไว้ชั่วคราวจนกว่าจะติดตั้ง next-auth
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { useSession } from "@/contexts/sessionContext";

export default function ProfilePage() {
  const [userCourses, setUserCourses] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [count, setCount] = useState(0);

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

  const { user } = useSession();
  const userName = user?.name;

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
    const fetchUserCourses = async () => {
      try {
        const res = await fetch(`/api/user/course/${currentUserId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user courses");
        }
        const data = await res.json();
        setUserCourses(data);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, [currentUserId]);
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

                {/* Rest of the stats boxes remain the same */}

                <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Badges</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-white">
                      <TbBadgesFilled />
                    </div>
                    <span className="text-xl">{count}</span>
                  </div>
                </div>

                <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Certificate</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-white">
                      <PiCertificateFill />
                    </div>
                    <span className="text-xl">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <NavbarSection />

        <div className="flex items-center gap-3 mt-8 mb-6">
          <FaGraduationCap className="text-purple-500 text-2xl" />
          <h2 className="text-white text-2xl font-bold">
            Let&apos;s start learning
          </h2>
        </div>

        {userCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userCourses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-gradient-to-br from-[#242851] to-[#1e2142] p-5 rounded-xl hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 border border-[#3a3f6a]/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img
                      src={course.imagePath || "/assets/Profile-Lerning.png"}
                      alt={course.name}
                      className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="text-white text-lg font-bold mb-2">
                    {course.name}
                  </div>

                  <div className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {course.detail?.substring(0, 100)}...
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-purple-900/30 text-purple-300 text-xs px-3 py-1 rounded-full">
                      Beginner
                    </div>

                    <a
                      href={`/courses/${course.id}`}
                      className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                    >
                      Continue{" "}
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-white text-2xl font-bold">
            You not enroll any course yet.
          </h2>
        )}

        {/* Recommended Path Section */}
        <div className="mt-16 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
            <h2 className="text-white text-2xl font-bold">
              Recommended Learning Path
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>

            <div className="space-y-6">
              <div className="relative pl-16">
                <div className="absolute left-[18px] w-8 h-8 rounded-full bg-purple-600 border-4 border-[#161831] flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="bg-[#242851]/70 p-5 rounded-xl border border-[#3a3f6a]/50">
                  <h3 className="text-white font-bold text-lg mb-2">
                    Fundamental for Cyber
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Master the core concepts of cybersecurity to build a strong
                    foundation for your learning journey.
                  </p>
                  <div className="mt-3">
                    <a
                      href="/courses/fundamental"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      Start this course <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-[18px] w-8 h-8 rounded-full bg-blue-600 border-4 border-[#161831] flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="bg-[#242851]/70 p-5 rounded-xl border border-[#3a3f6a]/50">
                  <h3 className="text-white font-bold text-lg mb-2">
                    Web Exploit Basic
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Learn how to identify and exploit common web vulnerabilities
                    in a controlled environment.
                  </p>
                  <div className="mt-3">
                    <a
                      href="/courses/web-exploit"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      Continue to this course <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-[18px] w-8 h-8 rounded-full bg-indigo-600 border-4 border-[#161831] flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="bg-[#242851]/70 p-5 rounded-xl border border-[#3a3f6a]/50">
                  <h3 className="text-white font-bold text-lg mb-2">
                    Basic of cyber threat prevention
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Develop skills to identify and prevent common cyber threats
                    before they become a problem.
                  </p>
                  <div className="mt-3">
                    <a
                      href="/courses/threat-prevention"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      Continue to this course <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
