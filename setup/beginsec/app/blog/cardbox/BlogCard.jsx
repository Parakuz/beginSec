import React from "react";
import PropTypes from "prop-types";

const BlogCard = ({ title, postTime, onClick, imageSrc }) => {
  return (
    <div
      className="w-full h-[432px] relative cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="w-full h-[432px] left-0 top-0 absolute bg-[#0d0e1c]/50 rounded-xl border-2 border-[#1f2246]" />
      <img
        className="w-[calc(100%-30px)] h-56 left-[15px] top-[16px] absolute rounded-md object-cover"
        src={imageSrc || null}
        alt={title}
      />
      <div className={`w-[calc(100%-30px)] left-[15px] top-[256px] absolute text-white text-xl font-medium ${
        /[\u0E00-\u0E7F]/.test(title) ? "font-ibmthai" : "font-['Satoshi']"
      }`}>
        {title}
      </div>
      <div className="left-[15px] top-[392px] absolute text-[#929ba4] text-base font-normal font-['Satoshi']">
        {postTime}
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default BlogCard;
