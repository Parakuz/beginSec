import React from "react";
import Navbar from "../../components/homepage/navbar";
import Footer from "../../components/homepage/Footer";
import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import NavbarSection from "../../components/homepage/navbar-section";
import { FaUser, FaEnvelope, FaLock, FaBell, FaCamera, FaUpload, FaPhone, FaCalendarAlt } from "react-icons/fa";

const ProfileSettingsPage = () => {
  return (
    <div className="bg-[#161831]">
      <Navbar />
      <div className="w-full h-[302px] bg-[#252525]/20 mx-auto p-20">
        <div className="container mx-auto">
          <div className="text-white text-[48px] font-bold mb-4 text-left">
            Singchai Areepoonsawat
          </div>
          <div className="flex justify-start gap-6">
            <div className="w-40 h-[70px] bg-[#242851] rounded-[5px] font-bold text-white px-3 py-2">
              <div>Completed rooms</div>
              <div className="text-white font-bold flex justify-start gap-x-3 pt-1">
                <div className="text-2xl">
                  <MdSensorDoor />
                </div>
                0
              </div>
            </div>
            <div className="w-40 h-[70px] bg-[#242851] rounded-[5px] font-bold text-white px-3 py-2">
              <div>Badges</div>
              <div className="text-white font-bold flex justify-start gap-x-3 pt-1">
                <div className="text-2xl">
                  <TbBadgesFilled />
                </div>
                0
              </div>
            </div>
            <div className="w-40 h-[70px] bg-[#242851] rounded-[5px] font-bold text-white px-3 py-2">
              <div>Certificate</div>
              <div className="text-white font-bold flex justify-start gap-x-3 pt-1">
                <div className="text-2xl">
                  <PiCertificateFill />
                </div>
                0
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <NavbarSection/>
        
        <div className="text-white mt-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture Upload Section - Left Side */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-[#242851] rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaCamera className="mr-2" /> Profile Picture
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4 bg-[#161831] rounded-full overflow-hidden border-4 border-purple-600">
                    <img 
                      src="/assets/default-avatar.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <FaCamera className="text-white text-3xl" />
                    </div>
                  </div>
                  <label className="w-full">
                    <div className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                      <FaUpload className="mr-2" /> Upload Photo
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                    />
                  </label>
                  <p className="text-sm text-gray-400 mt-3 text-center">
                    Recommended: Square JPG, PNG. <br />
                    Maximum size 2MB.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form Sections */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaUser className="mr-2" /> Personal Information
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        defaultValue="Singchai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        defaultValue="Areepoonsawat"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center">
                        <FaPhone className="mr-2" /> Phone
                      </label>
                      <input 
                        type="tel" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center">
                        <FaEnvelope className="mr-2" /> Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2" /> Date of Birth
                      </label>
                      <input 
                        type="date" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                      />
                    </div>
                    
                  </div>
                </form>
                
              </div>

              <div className=" rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaLock className="mr-2" /> Security Settings
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-[#242851] rounded-md py-2 px-3 text-white" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Enable two-factor authentication</span>
                    </label>
                  </div>
                </form>
              </div>
              
              <div className="bg-[#242851] rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaBell className="mr-2" /> Notification Preferences
                </h3>
                <form className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Email notifications for new badges</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Email notifications for new certificates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Email notifications for new rooms</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Marketing emails and promotions</span>
                    </label>
                  </div>
                </form>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;