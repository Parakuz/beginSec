"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../components/homepage/navbar";
import Footer from "../../components/homepage/Footer";
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
            throw new Error('Blog post not found');
          }
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        setBlogPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setError(error.message || 'An error occurred while fetching the blog post');
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
      }
    ];
    
    const mainBlogData = [
      {
        id: "main1",
        name: "Latest Cybersecurity News",
        detail: "Stay updated with the latest trends and news in cybersecurity.",
        imagePath: "/assets/MainBlog1.jpg",
      },
      {
        id: "main2",
        name: "Top Security Tips",
        detail: "Learn the top tips to keep your data and devices secure.",
        imagePath: "/assets/MainBlog3.webp",
      }
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
    return `Posted on ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  if (loading) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl">Loading blog post...</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !blogPost) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl text-red-500">{error}</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="bg-[#161831]">
        <div className="min-h-screen text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
            <p className="text-xl">Blog post not found</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#161831]">
      <div className="min-h-screen text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{blogPost.name}</h1>
          <p className="text-gray-400 mb-4">
            {formatDate(blogPost.createdAt) || (blogPost.admin ? `Posted by ${blogPost.admin.name}` : '')}
          </p>
          <img
            className="w-full h-[400px] object-cover"
            src={blogPost.imagePath || null}
            alt={blogPost.name}
          />
          <div className="text-lg mt-6">
            <ReactQuill
              value={blogPost.detail || "<p>No content available for this blog post.</p>"}
              readOnly={true}
              theme="snow"
              modules={{
                toolbar: false,
              }}
              className="lesson-quill border-none"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
