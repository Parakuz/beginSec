"use client";

import FooterList from "./reuseable/footer-list";
import FooterTopic from "./reuseable/footer-topic";
import FooterPath from "./reuseable/footer-path";
import Detail from "./reuseable/Detail";

function Footer() {
  return (
    <footer className="relative md:px-16 text-white overflow-x-clip h-64">
      <div className="border-t border-gray-700 mb-12 z-10"></div>
      <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-60 -right-20 -z-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ml-40">
        <div>
          <FooterTopic>Begin Sec</FooterTopic>
          <Detail>
            Lorem ipsum dolor sit amet consectetur. Amet vel a sit ac a lectus
            auctor. Bibendum dolor.
          </Detail>
          <div className="flex space-x-4 mt-4">
            <FooterPath href="#" className="text-gray-400 hover:text-white">
              Facebook
            </FooterPath>
            <FooterPath href="#" className="text-gray-400 hover:text-white">
              Twitter
            </FooterPath>
            <FooterPath href="#" className="text-gray-400 hover:text-white">
              Instagram
            </FooterPath>
          </div>
        </div>
        <div>
          <FooterTopic>Home</FooterTopic>
          <FooterList list={["Learning Path", "Blog", "Contact", "Profile"]} />
        </div>
        <div>
          <FooterTopic>Term & Conditions</FooterTopic>
          <FooterList list={["Privacy & Policy"]} />
        </div>
        <div className="z-10">
          <FooterTopic className="font-bold text-lg mb-4">Support</FooterTopic>
          <FooterList list={["Help", "FAQ"]} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
