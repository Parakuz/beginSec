"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
// import Navbar from "../../components/homepage/navbar";
// import Footer from "../../components/homepage/Footer";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog post data based on the id
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error("Failed to fetch blog post");
        }

        const data = await response.json();
        setBlogPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setError(
          error.message || "An error occurred while fetching the blog post"
        );
        setLoading(false);

        // Try to find in fallback data
        const fallbackPost = getFallbackPost(id);
        if (fallbackPost) {
          setBlogPost(fallbackPost);
          setError(null);
        }
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  // Fallback data in case the API fails
  const getFallbackPost = (postId) => {
    const blogData = [
      {
        id: "1",
        name: "Best Practices for Staying Safe Online",
        createdAt: "2023-09-25",
        imagePath: "/assets/blog1.jpg",
        detail: "Content for blog post 1",
      },
      {
        id: "2",
        name: "How to Protect Your Personal Data",
        createdAt: "2023-09-20",
        imagePath: "/assets/blog2.webp",
        detail: "Content for blog post 2",
      },
    ];

    const mainBlogData = [
      {
        id: "main1",
        name: "Latest Cybersecurity News",
        detail:
          "Stay updated with the latest trends and news in cybersecurity.",
        imagePath: "/assets/MainBlog1.jpg",
      },
      {
        id: "main2",
        name: "Top Security Tips",
        detail: "Learn the top tips to keep your data and devices secure.",
        imagePath: "/assets/MainBlog3.webp",
      },
    ];

    let post = blogData.find((post) => post.id === postId);
    if (!post) {
      post = mainBlogData.find((post) => post.id === postId);
    }
    return post;
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Posted on ${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  if (loading) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          {/* <Navbar /> */}
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl">Loading blog post...</p>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (error && !blogPost) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          {/* <Navbar /> */}
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl text-red-500">{error}</p>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          {/* <Navbar /> */}
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl">Blog post not found</p>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <div className="bg-[#161831] relative overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute -top-20 -left-20 z-0">
        <div className="w-[686.76px] h-[686.76px] origin-top-left rotate-[-33.25deg] bg-[conic-gradient(from_133deg_at_55.07%_49.43%,_#161831_0deg,_#161831_79deg,_#391A81_166deg,_#6231D5_194deg,_#794EDB_267deg,_#8F6CE1_360deg)] blur-[101.80px]" />
      </div>

      {/* Second decorative gradient for more depth */}
      <div className="absolute bottom-0 right-0 z-0">
        <div className="w-[500px] h-[500px] origin-bottom-right rotate-[15deg] bg-[conic-gradient(from_180deg_at_50%_50%,_#161831_0deg,_#161831_79deg,_#391A81_166deg,_#6231D5_194deg,_#794EDB_267deg,_#8F6CE1_360deg)] blur-[80px] opacity-70" />
      </div>

      <div className="min-h-screen text-white relative z-10">
        {/* <Navbar /> */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero image with enhanced styling */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(99,49,213,0.2)]">
            <img
              className="w-full h-[350px] object-cover transform hover:scale-105 transition-transform duration-700"
              src={blogPost.imagePath || null}
              alt={blogPost.name}
            />
          </div>

          {/* Title and author section with improved styling - changed text color to white */}
          <div className="mb-8 bg-[#1a1c3d]/70 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
              {blogPost.name}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-white mb-2">
              <p className="mr-2">Written By</p>
              <p className="font-medium text-white mr-4">
                {blogPost.author || "Begin Sec"}
              </p>
              <span className="text-white mx-2">•</span>
              <p>
                {blogPost.postDate
                  ? `${new Date(blogPost.postDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} at ${new Date(blogPost.postDate).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" }
                    )}`
                  : blogPost.createdAt
                  ? `${new Date(blogPost.createdAt).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "long", year: "numeric" }
                    )} at ${new Date(blogPost.createdAt).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" }
                    )}`
                  : ""}
              </p>
            </div>
          </div>

          {/* Section divider */}
          <div className="border-b border-gray-700 my-10"></div>

          {/* Section indicator with badge style - changed text color to white */}
          <div className="mb-6">
            <p className="text-white inline-block px-3 py-1 bg-[#2d1b4e]/70 rounded-full text-sm">
              Section {blogPost.section || "Cybernews"}
            </p>
          </div>

          {/* Content with improved styling */}
          <div className="p-6 md:p-8 rounded-xl bg-[#1a1c3d]/80 backdrop-blur-sm shadow-[0_5px_20px_rgba(0,0,0,0.3)] border border-[#2d2f5a]/50">
            <ReactQuill
              value={
                blogPost.detail
                  ? // แปลงข้อความปกติให้เป็น HTML โดยแทนที่การขึ้นบรรทัดใหม่ด้วย <br>
                    blogPost.detail.replace(/\n/g, "<br>")
                  : "<p>No content available for this blog post.</p>"
              }
              readOnly={true}
              theme="snow"
              modules={{
                toolbar: false,
              }}
              className="lesson-quill border-none blog-content text-white"
            />
          </div>

          {/* Tags section with improved styling - changed text color to white */}
          {blogPost.tags && (
            <div className="mt-10 bg-[#1a1c3d]/50 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-white mb-3 font-medium">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#2d1b4e] rounded-full text-sm text-white hover:bg-[#391A81] transition-colors duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default BlogPostPage;
