import React, { useState } from "react";

const CommentForm = ({ productId, onCommentAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return; // ป้องกันการส่งค่าว่าง

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, content }),
    });

    if (res.ok) {
      setContent("");
      onCommentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mt-4 w-full max-w-lg">
      <textarea
        placeholder="Add your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        rows="3"
      />
      <button
        type="submit"
        disabled={!content.trim()}
        className="btn btn-primary w-full mt-2 disabled:bg-gray-400 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
