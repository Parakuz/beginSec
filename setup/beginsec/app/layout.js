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
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
