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
      <div className="w-84 h-96 bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-105">
        <img src={src} alt={title} className="w-full h-72 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {truncatedTitle}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 font-ibmthai ">
            {truncatedContent}
          </p>
        </div>
      </div>
    </Link>
  );
}
