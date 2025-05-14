"use client"; // ต้องมี เพื่อให้ใช้ useRouter ได้ใน app directory

import { useRouter } from "next/navigation";

function ContentCard({ src, alt, description, ontop, href }) {
  const router = useRouter();
  let style = "rounded overflow-hidden cursor-pointer";
  if (ontop) {
    style += " z-10";
  }

  return (
    <div className={style} onClick={() => router.push(href)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-60 object-cover rounded-lg"
      />
      <p className="text-center py-2 text-white">{description}</p>
    </div>
  );
}

export default ContentCard;
