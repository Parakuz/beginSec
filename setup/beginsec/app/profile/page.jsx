import React from "react";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";
import { MdSensorDoor } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { TbBadgesFilled } from "react-icons/tb";
import NavbarSection from "../components/homepage/navbar-section";

const ProfilePage = () => {
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
        <div className="text-white text-xl font-bold pt-8">
          Let's start learning
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="text-left">
            <img
              src="/assets/Profile-Lerning.png"
              alt="Profile Learning"
              className="py-8"
            />
            <div className="text-white text-lg font-bold">
              Fundamental for Cyber
            </div>
          </div>
          <div className="text-left">
            <img
              src="/assets/Profile-Lerning2.png"
              alt="Profile Learning"
              className="py-8"
            />
            <div className="text-white text-lg font-bold">
              Web Exploit Basic
            </div>
          </div>
          <div className="text-left">
            <img
              src="/assets/Profile-Lerning2.png"
              alt="Profile Learning"
              className="py-8"
            />
            <div className="text-white text-lg font-bold">
              Basic of cyber threat prevention
            </div>
          </div>
          <div className="text-left">
            <img
              src="/assets/Profile-Lerning2.png"
              alt="Profile Learning"
              className="py-8"
            />
            <div className="text-white text-lg font-bold">
              Profile Learning 4
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;