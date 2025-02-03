import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/homepage/Navbar";

export const metadata = {
  title: "beginSec",
  description: "Cybersecurity platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
