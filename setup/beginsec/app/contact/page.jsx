import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/homepage/navbar";
import Footer from "../components/homepage/Footer";
import styles from "@/styles/Form.module.css";
import Button from "../components/homepage/reuseable/Button";
const ContactPage = () => {
  return (
    <div className="bg-[#161831]">
      <Navbar />
      <div className="w-full bg-[#252525]/40 p-16">
        <h1 className="text-white text-[40px] font-bold  mb-4 text-center">
          Contact Us
        </h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center mt-8">
          <div className="w-[958px] h-[276px] flex justify-between items-center">
            <div className="w-[264px] h-[276px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <div className="bg-[#E5E8EA] text-white rounded-full p-6 mb-2">
                <FaMapMarkerAlt className="text-4xl text-[#391A81]" />
              </div>
              <h2 className="text-xl font-bold mb-2">Location</h2>
              <p className="text-center">
                1234 Street Name, City, State, 12345
              </p>
            </div>
            <div className="w-[264px] h-[276px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <div className="bg-[#E5E8EA] text-white rounded-full p-6 mb-3">
                <FaPhoneAlt className="text-4xl text-[#391A81]" />
              </div>
              <h2 className="text-xl font-bold mb-2">Contact</h2>
              <p className="text-center">Phone: (123) 456-7890</p>
              <p className="text-center">Fax: (123) 456-7891</p>
            </div>
            <div className="w-[264px] h-[276px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <div className="bg-[#E5E8EA] text-white rounded-full p-6 mb-3">
                <FaEnvelope className="text-4xl text-[#391A81]" />
              </div>
              <h2 className="text-xl font-bold mb-2">Email</h2>
              <p className="text-center">info@example.com</p>
              <p className="text-center">support@example.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 mt-8 space-y-8">
          <div className="w-full md:w-1/2 space-y-8">
            <div className="flex-col justify-start items-start gap-3 inline-flex ">
              <div className="self-stretch text-white text-[25px] font-bold ">
                Send Us A Message
              </div>
              <div className="self-stretch text-white text-base font-normal ">
                Lorem ipsum dolor sit amet consectetur. Nunc vitae arcu facilisi
                nisl cras
              </div>
            </div>
            <form className="space-y-4">
              <div className="flex mb-4 gap-4">
                <div className="w-1/2 ">
                  <label className="block text-white text-base font-bold mb-2">
                    Name
                  </label>
                  <input
                    className={`${styles.input_text} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-white text-base font-bold mb-2"
                    htmlFor="confirm-email"
                  >
                    Email
                  </label>
                  <input
                    className={`${styles.input_text} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    id="confirm-email"
                    type="email"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="mb-4  ">
                <label className="block text-white text-base font-bold mb-2">
                  Phone
                </label>
                <input
                  className={`${styles.input_text} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="phone"
                  type="text"
                  placeholder="Your phone number"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-white text-base font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className={`${styles.input_text} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3`}
                  id="message"
                  placeholder="Your message"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <Button text="Send" />
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c5f1b1e1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633078871234!5m2!1sen!2sau"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="rounded-md shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
