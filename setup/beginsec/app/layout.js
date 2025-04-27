import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "@/contexts/sessionContext";
import "./globals.css";

import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";

export const metadata = {
  title: "beginSec",
  description: "Cybersecurity platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" // หรือ dark ได้
          />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
