"use client";
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import Footer from "@/components/homepage/Footer";
import styles from "@/styles/Form.module.css";
import Button from "@/components/homepage/reuseable/Button";

const ContactPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#161831] relative overflow-hidden">
      {/* Navbar with higher z-index */}
      <div className="relative z-20">{/* <Navbar /> */}</div>

      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ zIndex: 0, pointerEvents: "none" }}
      >
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#391A81]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#6231D5]/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full bg-[#252525]/40 p-8 md:p-16 relative z-10 backdrop-blur-sm">
        <h1 className="text-white text-[32px] md:text-[40px] font-bold mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to
          our team using any of the methods below.
        </p>
      </div>

      <div className="container mx-auto p-4 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8">
          <div className="w-full md:w-[264px] h-[276px] bg-[#1E2040]/80 backdrop-blur-sm text-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,49,213,0.3)] border border-[#2d2f5a]/50">
            <div className="bg-gradient-to-br from-[#391A81] to-[#6231D5] text-white rounded-full p-6 mb-4 shadow-md">
              <FaMapMarkerAlt className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Location</h2>
            <p className="text-center text-gray-300">
              126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
            </p>
          </div>

          <div className="w-full md:w-[264px] h-[276px] bg-[#1E2040]/80 backdrop-blur-sm text-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,49,213,0.3)] border border-[#2d2f5a]/50">
            <div className="bg-gradient-to-br from-[#391A81] to-[#6231D5] text-white rounded-full p-6 mb-4 shadow-md">
              <FaPhoneAlt className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-center text-gray-300">Phone: (02) 470-8000</p>
            <p className="text-center text-gray-300">Fax: (02) 470-8001</p>
          </div>

          <div className="w-full md:w-[264px] h-[276px] bg-[#1E2040]/80 backdrop-blur-sm text-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,49,213,0.3)] border border-[#2d2f5a]/50">
            <div className="bg-gradient-to-br from-[#391A81] to-[#6231D5] text-white rounded-full p-6 mb-4 shadow-md">
              <FaEnvelope className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">Email</h2>
            <p className="text-center text-gray-300">info@kmutt.ac.th</p>
            <p className="text-center text-gray-300">support@kmutt.ac.th</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-16 space-y-8 md:space-y-0">
          <div className="w-full md:w-1/2 space-y-8">
            <div className="flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch text-white text-[25px] font-bold">
                Send Us A Message
              </div>
              <div className="self-stretch text-gray-300 text-base font-normal">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row mb-4 gap-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-white text-base font-medium mb-2">
                    Name
                  </label>
                  <input
                    className={`${styles.input_text} bg-white/90 border border-[#2d2f5a] rounded-lg w-full py-3 px-4 text-[#252525] leading-tight focus:outline-none focus:border-[#6231D5] focus:ring-2 focus:ring-[#6231D5]/50 transition-all duration-300 placeholder-gray-500`}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    className="block text-white text-base font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className={`${styles.input_text} bg-white/90 border border-[#2d2f5a] rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:border-[#6231D5] focus:ring-2 focus:ring-[#6231D5]/50 transition-all duration-300 placeholder-gray-500 font-normal font-['Satoshi'] `}
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white text-base font-medium mb-2">
                  Phone
                </label>
                <input
                  className={`${styles.input_text} bg-white/90 border border-[#2d2f5a] rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:border-[#6231D5] focus:ring-2 focus:ring-[#6231D5]/50 transition-all duration-300 placeholder-gray-500`}
                  id="phone"
                  type="text"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-white text-base font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className={`${styles.input_text} bg-white/90 border border-[#2d2f5a] rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:border-[#6231D5] focus:ring-2 focus:ring-[#6231D5]/50 transition-all duration-300 resize-none placeholder-gray-500`}
                  id="message"
                  placeholder="Your message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#391A81] to-[#6231D5] hover:from-[#4B2A91] hover:to-[#7241E5] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/2">
            {isMounted && (
              <div className="rounded-xl overflow-hidden shadow-lg border border-[#2d2f5a]/50 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.7102612165196!2d100.49393731482933!3d13.65089990412606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a251bb6b0cf1%3A0xf656e94ff13324ad!2sKing%20Mongkut&#39;s%20University%20of%20Technology%20Thonburi!5e0!3m2!1sen!2sth!4v1625661833123!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "550px", border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="h-full"
                ></iframe>
              </div>
            )}
            {!isMounted && (
              <div
                className="rounded-xl h-full bg-[#1E2040]/80 flex items-center justify-center border border-[#2d2f5a]/50 shadow-lg"
                style={{ minHeight: "550px" }}
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-300">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default ContactPage;
