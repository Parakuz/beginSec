import React from "react";

const Button = ({ text }) => {
  return (
    <button className="h-12 px-8 py-3 bg-[#391a81] hover:bg-[#6231d5] rounded-[10px] justify-center items-center gap-2 inline-flex">
      <div className="text-white text-lg font-bold font-['Satoshi']">{text}</div>
    </button>
  );
};

export default Button;