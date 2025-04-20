import React from "react";
import Navbar from "../../components/homepage/navbar";
import Footer from "../../components/homepage/Footer";
import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import NavbarSection from "../../components/homepage/navbar-section";
import { FaCalendarAlt, FaClock, FaChartLine, FaCheckCircle, FaTrophy, FaFire, FaChartBar } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";
import { BiTargetLock } from "react-icons/bi";

const StatisticsPage = () => {
  // Sample data for statistics
  const userStats = {
    totalPoints: 0,
    completedChallenges: 0,
    skillLevel: "Beginner",
    streak: 0,
    avgTimePerRoom: "0 mins",
    lastActive: "Never",
    totalTimeSpent: "0 hours",
    skillDistribution: [
      { skill: "Web Security", level: 10 },
      { skill: "Network Security", level: 5 },
      { skill: "Cryptography", level: 15 },
      { skill: "OSINT", level: 8 },
      { skill: "Forensics", level: 12 },
    ],
    recentActivity: [
      // Empty for now
    ],
    weeklyProgress: [
      { day: "Mon", rooms: 0 },
      { day: "Tue", rooms: 0 },
      { day: "Wed", rooms: 0 },
      { day: "Thu", rooms: 0 },
      { day: "Fri", rooms: 0 },
      { day: "Sat", rooms: 0 },
      { day: "Sun", rooms: 0 },
    ],
  };

  let userCourses = []
  const userName = "Guest User";
  
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
                
                {/* Rest of the stats boxes remain the same */}

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
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaChartLine className="mr-2 text-3xl" /> Your Statistics
          </h2>
          
          {/* Key Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <FaTrophy className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold">Total Points</h3>
              </div>
              <p className="text-4xl font-bold">{userStats.totalPoints}</p>
              <p className="text-gray-400 mt-2">Keep solving challenges to earn points</p>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <FaCheckCircle className="text-3xl text-green-500 mr-3" />
                <h3 className="text-xl font-bold">Completed</h3>
              </div>
              <p className="text-4xl font-bold">{userStats.completedChallenges}</p>
              <p className="text-gray-400 mt-2">Challenges completed</p>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <BiTargetLock className="text-3xl text-blue-500 mr-3" />
                <h3 className="text-xl font-bold">Skill Level</h3>
              </div>
              <p className="text-4xl font-bold">{userStats.skillLevel}</p>
              <p className="text-gray-400 mt-2">Your current rank</p>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <FaFire className="text-3xl text-orange-500 mr-3" />
                <h3 className="text-xl font-bold">Streak</h3>
              </div>
              <p className="text-4xl font-bold">{userStats.streak}</p>
              <p className="text-gray-400 mt-2">Days in a row</p>
            </div>
          </div>
          
          {/* Time Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <RiTimerLine className="text-3xl text-purple-500 mr-3" />
                <h3 className="text-xl font-bold">Avg. Time per Room</h3>
              </div>
              <p className="text-3xl font-bold">{userStats.avgTimePerRoom}</p>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-3xl text-indigo-500 mr-3" />
                <h3 className="text-xl font-bold">Last Active</h3>
              </div>
              <p className="text-3xl font-bold">{userStats.lastActive}</p>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <div className="flex items-center mb-2">
                <FaClock className="text-3xl text-teal-500 mr-3" />
                <h3 className="text-xl font-bold">Total Time</h3>
              </div>
              <p className="text-3xl font-bold">{userStats.totalTimeSpent}</p>
            </div>
          </div>
          
          {/* Skill Distribution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#242851] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaChartBar className="mr-2 text-2xl" /> Skill Distribution
              </h3>
              <div className="space-y-4">
                {userStats.skillDistribution.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.skill}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#161831] rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#242851] rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-2xl" /> Weekly Activity
              </h3>
              <div className="flex items-end justify-between h-48 pt-4">
                {userStats.weeklyProgress.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-purple-600 rounded-t-md" 
                      style={{ 
                        height: day.rooms > 0 ? `${day.rooms * 10}px` : '5px',
                        opacity: day.rooms > 0 ? 1 : 0.3
                      }}
                    ></div>
                    <span className="mt-2 text-sm">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="bg-[#242851] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-2xl" /> Recent Activity
            </h3>
            {userStats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {/* Activity items would go here */}
                <p>No recent activity to display.</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No recent activity to display.</p>
                <p className="mt-2">Complete challenges to see your activity here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatisticsPage;