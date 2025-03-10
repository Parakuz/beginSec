import { SessionProvider } from "@/contexts/sessionContext";
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
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
