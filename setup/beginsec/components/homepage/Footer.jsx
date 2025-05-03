"use client";

import FooterList from "./reuseable/footer-list";
import FooterTopic from "./reuseable/footer-topic";
import FooterPath from "./reuseable/footer-path";
import Detail from "./reuseable/Detail";

function Footer() {
  return (
    <footer className="relative md:px-16 text-white h-64">
      <div className="border-t border-gray-700 mb-12 z-10"></div>
      <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-60 -right-20 -z-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ml-40">
        <div>
          <FooterTopic>Begin Sec</FooterTopic>
          <Detail className="font-ibmthai">
            © 2025 Begin Sec.สงวนลิขสิทธิ์ทั้งหมด.
          </Detail>
          <div className="flex space-x-4 mt-4">
            <FooterPath href="https://facebook.com" className="text-gray-400 hover:text-white">
              Facebook
            </FooterPath>
            <FooterPath href="https://twitter.com" className="text-gray-400 hover:text-white">
              Twitter
            </FooterPath>
            <FooterPath href="https://instagram.com" className="text-gray-400 hover:text-white">
              Instagram
            </FooterPath>
          </div>
        </div>
        <div>
          <FooterTopic>Home</FooterTopic>
          <FooterList list={[
            { label: "Learning Path", href: "/learning-path" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
            { label: "Profile", href: "/profile" }
          ]} />
        </div>
        <div>
          <FooterTopic>Term & Conditions</FooterTopic>
          <FooterList list={[
            { label: "Privacy & Policy", href: "/privacy-policy" }
          ]} />
        </div>
        <div className="z-10">
          <FooterTopic className="font-bold text-lg mb-4">Support</FooterTopic>
          <FooterList list={[
            { label: "Help", href: "/help" },
            { label: "FAQ", href: "/faq" }
          ]} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
