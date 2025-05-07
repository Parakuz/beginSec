"use client";
import { useEffect, useState } from "react";
// import Navbar from "../../components/homepage/navbar";
// import Footer from "../../components/homepage/Footer";

import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import {
  FaAward,
  FaMedal,
  FaTrophy,
  FaStar,
  FaDownload,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import NavbarSection from "@/components/homepage/navbar-section";
import { useSession } from "@/contexts/sessionContext";

const StatPage = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [testScores, setTestScores] = useState({
    pretest: { score: [] },
    posttest: { score: [] },
  });
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useSession();
  const userName = user?.name;

  // แมปคะแนน posttest ตาม CourseId
  const posttestScoreMap = testScores.posttest.score.reduce((acc, entry) => {
    acc[entry.CourseId] = entry.PosttestScore;
    return acc;
  }, {});

  // แมปคะแนน pretest ตาม CourseId
  const pretestScoreMap = testScores.pretest.score.reduce((acc, entry) => {
    acc[entry.CourseId] = entry.PretestScore;
    return acc;
  }, {});

  useEffect(() => {
    if (!currentUserId) return;

    async function fetchTestScores() {
      try {
        const response = await fetch(
          `/api/user/combined-test/${currentUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test scores");
        }
        const data = await response.json();
        setTestScores(data);
        setCount(data.posttest?.count || 0);
      } catch (err) {
        console.error("Error fetching test scores:", err);
      }
    }

    fetchTestScores();
  }, [currentUserId]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course");
        const data = await response.json();
        const sortedCourses = data.sort((a, b) => a.id - b.id);
        setCourses(sortedCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();
        setCurrentUserId(data.userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161831] to-[#0c0e1d]">
      {/* <Navbar /> */}

      {/* Profile Header Section */}
      <div className="relative w-full bg-[#252525]/20 overflow-hidden">
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
                    <div className="text-2xl text-white">
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
          {/* ส่วนแสดงคะแนน */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaStar className="mr-2 text-3xl text-yellow-400" /> Test Scores
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-xl text-gray-400">Loading data...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl text-gray-400">No course data found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {courses.map((course) => {
                  const pretestScore = pretestScoreMap[course.id];
                  const posttestScore = posttestScoreMap[course.id];

                  return (
                    <div
                      key={course.id}
                      className="bg-[#242851] rounded-lg p-6 border border-[#3a3f6a] hover:border-purple-500/50 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-4 border-b border-[#3a3f6a] pb-3">
                        {course.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-[#1a1c3d] p-4 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2 text-purple-300">
                            Pretest Score
                          </h4>
                          <div className="flex items-center">
                            {pretestScore !== undefined ? (
                              <div className="text-3xl font-bold">
                                {pretestScore}{" "}
                                <span className="text-lg text-gray-400">
                                  / 100
                                </span>
                              </div>
                            ) : (
                              <div className="text-xl text-gray-400">
                                ยังไม่ทำบทเรียนนี้
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-[#1a1c3d] p-4 rounded-lg">
                          <h4 className="text-lg font-semibold mb-2 text-purple-300">
                            Posttest Score
                          </h4>
                          <div className="flex items-center">
                            {posttestScore !== undefined ? (
                              <div className="text-3xl font-bold">
                                {posttestScore}{" "}
                                <span className="text-lg text-gray-400">
                                  / 100
                                </span>
                              </div>
                            ) : (
                              <div className="text-xl text-gray-400">
                                ยังไม่ทำบทเรียนนี้
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* แสดงความก้าวหน้า (ถ้ามีทั้งคะแนน pretest และ posttest) */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default StatPage;
