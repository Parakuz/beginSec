"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBtn({ children, des, customClass = "hover:text-purple-400" }) {
  const pathname = usePathname();
  const isActive = pathname !== "/signup" && pathname === des;

  return (
    <Link
      href={des}
      className={`relative text-sm font-medium ${customClass} ${
        isActive
          ? "before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-white before:content-['']"
          : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default NavBtn;
