import React from "react";

const MainBlog = ({ title, description, imageSrc, topic }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-96">
      {" "}
      {/* Added shadow-2xl class */}
      <img
        src={imageSrc || null}
        alt={title}
        className="w-full h-64 object-cover"
      />{" "}
      {/* Added null fallback for empty imageSrc */}
      <div className="p-4 h-32 overflow-hidden">
        {" "}
        {/* Reduced padding for the content */}
        <div className="text-lg font-bold text-black mb-0.5">{title}</div>{" "}
        {/* Reduced margin-bottom */}
        <p className="text-gray-600">{description}</p>
        {topic && <p className="text-gray-500 mt-0.5">{topic}</p>}{" "}
        {/* Reduced margin-top */}
      </div>
    </div>
  );
};

export default MainBlog;
