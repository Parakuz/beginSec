"use client";

import { useState } from "react";
import { FaUsers, FaFacebook, FaDiscord } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BiLink } from "react-icons/bi";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function SocialToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    {
      icon: <FaUsers />,
      href: "https://www.facebook.com/groups/beginseccommunity",
      label: "Community",
    },
    {
      icon: <FaFacebook />,
      href: "https://www.facebook.com/BeginSec/",
      label: "Facebook",
    },
    {
      icon: <FaDiscord />,
      href: "https://discord.gg/AzPkXpgzcq",
      label: "Discord",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-center space-y-2 z-50">
      <AnimatePresence>
        {isOpen &&
          links.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="w-full flex justify-center"
            >
              <Link
                href={link.href}
                target="_blank"
                className="bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition"
                title={link.label}
              >
                {link.icon}
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      <button
        onClick={toggleMenu}
        className="bg-purple-700 text-white p-4 rounded-full shadow-lg hover:bg-purple-800 transition"
      >
        {isOpen ? <IoClose size={24} /> : <BiLink size={24} />}
      </button>
    </div>
  );
}
