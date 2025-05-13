import Link from "next/link";

export default function Card({ href, src, title, content }) {
  const maxTitleLength = 40;
  const maxContentLength = 80;

  const truncatedTitle =
    title.length > maxTitleLength
      ? title.substring(0, maxTitleLength) + "..."
      : title;

  const truncatedContent =
    content.length > maxContentLength
      ? content.substring(0, maxContentLength) + "..."
      : content;

  return (
    <Link href={href}>
      <div className="w-full h-[420px] bg-gradient-to-b from-[#1E2040] to-[#161831] rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 border border-[#2A2E57]">
        <div className="relative">
          <img src={src} alt={title} className="w-full h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161831] to-transparent opacity-40"></div>
        </div>
        <div className="p-5 pt-4 font-ibmthai">
          <h3 className="text-lg font-semibold text-white line-clamp-1 mb-2">
            {truncatedTitle}
          </h3>
          <p className="text-purple-200/80 text-sm line-clamp-2">
            {truncatedContent}
          </p>
        </div>
      </div>
    </Link>
  );
}
