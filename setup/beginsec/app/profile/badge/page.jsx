"use client";
import { useEffect, useState, useRef } from "react";
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

const BadgesAndCertificationsPage = () => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [scores, setScores] = useState([]);
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const { user } = useSession();
  const userName = user?.name;
  const scoreMap = scores.reduce((acc, entry) => {
    acc[entry.CourseId] = entry.PosttestScore;
    return acc;
  }, {});

  const icons = [
    <FaMedal className="text-5xl text-gray-500" />,
    <FaTrophy className="text-5xl text-gray-500" />,
    <FaStar className="text-5xl text-gray-500" />,
    <FaAward className="text-5xl text-gray-500" />,
  ];

  const iconsCompletes = [
    <FaMedal className="text-5xl text-white" />,
    <FaTrophy className="text-5xl text-white" />,
    <FaStar className="text-5xl text-white" />,
    <FaAward className="text-5xl text-white" />,
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const handleContextMenu = (e) => e.preventDefault();
    canvas?.addEventListener("contextmenu", handleContextMenu);

    return () => {
      canvas?.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/Cert.png";
    img.onload = () => {
      image.current = img;
      setImageLoaded(true);
      drawCanvas();
    };
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    async function fetchPosttestScores() {
      try {
        const response = await fetch(`/api/user/posttest/${currentUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch scores");
        }
        const data = await response.json();
        setScores(data.score);
        setCount(data.count);
      } catch (err) {
        console.error("Error fetching scores:", err);
        setError(err.message);
      }
    }

    fetchPosttestScores();
  }, [currentUserId]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course");
        const data = await response.json();
        const sortedCourses = data.sort((a, b) => a.id - b.id);
        setCourses(sortedCourses);
        setCount;
      } catch (error) {
        console.error("Error fetching courses:", error);
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
        setFeedback("❌ Error fetching user data.");
      }
    };

    fetchUserId();
  }, []);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image.current, 0, 0, canvas.width, canvas.height);

    if (userName) {
      ctx.font = 'bold 64px "Brush Script MT", cursive';
      ctx.fillStyle = "#0c2340";
      ctx.textAlign = "center";
      ctx.fillText(userName, canvas.width / 2, 400);
    }
  };

  useEffect(() => {
    if (imageLoaded) drawCanvas();
  }, [userName]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `certificate-${userName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
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
          {/* Badges Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TbBadgesFilled className="mr-2 text-3xl" /> Badges
            </h2>

            {/* Rest of the badges section remains the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Badge Card - Unlocked */}

              {courses
                .sort((a, b) => a.id - b.id)
                .map((data, i) => {
                  const score = scoreMap[data.id] || 0; // ถ้าไม่เจอให้ถือว่า 0

                  const isPassed = score >= 80;

                  return (
                    <div
                      key={data.id}
                      className={`bg-[#242851] rounded-lg p-6 flex flex-col items-center ${
                        isPassed
                          ? "border-2 border-purple-500/50 shadow-lg shadow-purple-500/10"
                          : "opacity-50"
                      }`}
                    >
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2 ${
                          isPassed
                            ? "bg-gradient-to-br from-purple-600 to-blue-600 border-purple-400"
                            : "bg-[#161831] border-gray-600"
                        }`}
                      >
                        {isPassed
                          ? iconsCompletes[i % iconsCompletes.length]
                          : icons[i % icons.length]}
                      </div>

                      <h3 className="text-xl text-center font-bold mb-2 font-ibmthai">
                        {data.name}
                      </h3>

                      <p className="text-gray-300 text-center mb-4 font-ibmthai">
                        {data.detail}
                      </p>

                      {isPassed ? (
                        <div className="text-sm text-green-400 flex items-center">
                          <FaCheckCircle className="mr-1" /> Earned
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaCalendarAlt className="mr-1" /> Locked
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Certificates Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <PiCertificateFill className="mr-2 text-3xl" /> Certificates
            </h2>

            {/* Certificate Card - Locked */}
            <div
              className={`bg-[#242851] rounded-lg p-6 ${
                count !== courses.length ? "opacity-50" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-48 h-36 bg-[#161831] rounded-md flex items-center justify-center border-2 border-gray-600 overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={1000}
                    height={700}
                    className={`w-full h-full rounded-s pointer-events-none ${
                      count !== courses.length
                        ? "blur-sm md:blur-md lg:blur-lg"
                        : ""
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    Web Security Expert
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Complete the Web Security learning path to earn this
                    certificate
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      {count === courses.length ? (
                        <>
                          <FaCheckCircle className="mr-1 text-green-400" />{" "}
                          Earned
                        </>
                      ) : (
                        <>
                          <FaCalendarAlt className="mr-1" /> Not completed
                        </>
                      )}
                    </div>

                    <button
                      onClick={downloadImage}
                      disabled={count !== courses.length}
                      className={`px-4 py-2 rounded-md flex items-center transition ${
                        count === courses.length
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FaDownload className="mr-2" /> Download
                    </button>
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
};

export default BadgesAndCertificationsPage;
