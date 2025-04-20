import React from "react";
import Navbar from "../../components/homepage/navbar";
import Footer from "../../components/homepage/Footer";
import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import { FaAward, FaMedal, FaTrophy, FaStar, FaDownload, FaCalendarAlt } from "react-icons/fa";
import NavbarSection from "../../components/homepage/navbar-section";

const BadgesAndCertificationsPage = () => {
  const userName = "Singchai Areepoonsawat";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161831] to-[#0c0e1d]">
      <Navbar />
      
      {/* Profile Header Section */}
      <div className="relative w-full bg-[#252525]/20 overflow-hidden">
        {/* Removed gradient overlay divs */}
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-[#242851] shadow-lg shadow-purple-900/20">
              {userName.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="text-white text-3xl md:text-5xl font-bold mb-4 text-left">{userName}</div>

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
                    <span className="text-xl">0</span>
                  </div>
                </div>

                <div className="w-40 h-[80px] bg-[#242851] rounded-lg font-bold text-white px-4 py-3 shadow-lg shadow-black/20 hover:translate-y-[-5px] transition-all duration-300 border border-[#3a3f6a]">
                  <div className="text-white text-sm">Badges</div>
                  <div className="text-white font-bold flex items-center gap-x-3 pt-1">
                    <div className="text-2xl text-white">
                      <TbBadgesFilled />
                    </div>
                    <span className="text-xl">0</span>
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
      
      <div className="container mx-auto px-4 py-10">
        <NavbarSection/>
        
        <div className="text-white mt-8 mb-12">
          {/* Badges Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TbBadgesFilled className="mr-2 text-3xl" /> Badges
            </h2>
            
            {/* Rest of the badges section remains the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Badge Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 flex flex-col items-center opacity-50">
                <div className="w-24 h-24 bg-[#161831] rounded-full flex items-center justify-center mb-4 border-2 border-gray-600">
                  <FaMedal className="text-5xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Beginner Hacker</h3>
                <p className="text-gray-400 text-center mb-4">Complete your first room</p>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Locked
                </div>
              </div>
              
              {/* Badge Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 flex flex-col items-center opacity-50">
                <div className="w-24 h-24 bg-[#161831] rounded-full flex items-center justify-center mb-4 border-2 border-gray-600">
                  <FaTrophy className="text-5xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Web Warrior</h3>
                <p className="text-gray-400 text-center mb-4">Complete 5 web security rooms</p>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Locked
                </div>
              </div>
              
              {/* Badge Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 flex flex-col items-center opacity-50">
                <div className="w-24 h-24 bg-[#161831] rounded-full flex items-center justify-center mb-4 border-2 border-gray-600">
                  <FaStar className="text-5xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Crypto Master</h3>
                <p className="text-gray-400 text-center mb-4">Complete all cryptography challenges</p>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Locked
                </div>
              </div>
              
              {/* Badge Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 flex flex-col items-center opacity-50">
                <div className="w-24 h-24 bg-[#161831] rounded-full flex items-center justify-center mb-4 border-2 border-gray-600">
                  <FaAward className="text-5xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Network Ninja</h3>
                <p className="text-gray-400 text-center mb-4">Complete all network security rooms</p>
                <div className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Locked
                </div>
              </div>
            </div>
          </div>
          
          {/* Certificates Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <PiCertificateFill className="mr-2 text-3xl" /> Certificates
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Certificate Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 opacity-50">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-48 h-36 bg-[#161831] rounded-md flex items-center justify-center border-2 border-gray-600">
                    <PiCertificateFill className="text-6xl text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Fundamentals of Cybersecurity</h3>
                    <p className="text-gray-400 mb-4">Complete the Fundamentals learning path to earn this certificate</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" /> Not completed
                      </div>
                      <button disabled className="px-4 py-2 bg-gray-700 text-gray-400 rounded-md flex items-center cursor-not-allowed">
                        <FaDownload className="mr-2" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certificate Card - Locked */}
              <div className="bg-[#242851] rounded-lg p-6 opacity-50">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-48 h-36 bg-[#161831] rounded-md flex items-center justify-center border-2 border-gray-600">
                    <PiCertificateFill className="text-6xl text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Web Security Expert</h3>
                    <p className="text-gray-400 mb-4">Complete the Web Security learning path to earn this certificate</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" /> Not completed
                      </div>
                      <button disabled className="px-4 py-2 bg-gray-700 text-gray-400 rounded-md flex items-center cursor-not-allowed">
                        <FaDownload className="mr-2" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BadgesAndCertificationsPage;