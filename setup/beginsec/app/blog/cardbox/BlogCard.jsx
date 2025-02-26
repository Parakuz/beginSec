import React from "react";
import PropTypes from "prop-types";

const BlogCard = ({ title, postTime, onClick, imageSrc }) => {
  return (
    <div className="w-[352px] h-[432px] relative cursor-pointer" onClick={onClick}>
      <div className="w-[352px] h-[432px] left-0 top-0 absolute bg-[#0d0e1c]/50 rounded-xl border-2 border-[#1f2246]" />
      <img className="w-[322px] h-56 left-[15px] top-[16px] absolute rounded-md" src={imageSrc} alt={title} />
      <div className="w-[322px] left-[15px] top-[256px] absolute text-white text-xl font-bold font-['Satoshi']">{title}</div>
      <div className="left-[15px] top-[392px] absolute text-[#929ba4] text-base font-normal font-['Satoshi']">{postTime}</div>
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
