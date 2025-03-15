"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./cardbox/BlogCard";
import Navbar from "../components/homepage/navbar";
import Footer from "../components/homepage/Footer";
import { useRouter } from "next/navigation";
import MainBlog from "./cardbox/MainBlog";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Autoplay } from 'swiper/modules';

const BlogPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        
        // For now, we'll use the first 5 blogs as featured blogs
        // In a real application, you might have a featured flag in your database
        setFeaturedBlogs(data.slice(0, 5));
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs. Please try again later.');
        setLoading(false);
        
        // Fallback to hardcoded data if API fails
        setFeaturedBlogs(getFallbackFeaturedBlogs());
        setBlogs(getFallbackBlogs());
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`);
  };

  // Fallback data in case the API fails
  const getFallbackBlogs = () => [
    {
      id: "1",
      name: "Best Practices for Staying Safe Online",
      detail: "Content for blog post 1",
      imagePath: "/assets/blog1.jpg",
      admin: { name: "Admin" },
      createdAt: "2023-09-25"
    },
    {
      id: "2",
      name: "How to Protect Your Personal Data",
      detail: "Content for blog post 2",
      imagePath: "/assets/blog2.webp",
      admin: { name: "Admin" },
      createdAt: "2023-09-20"
    },
    // Add more fallback blogs as needed
  ];

  const getFallbackFeaturedBlogs = () => [
    {
      id: "main1",
      name: "Latest Cybersecurity News",
      detail: "Stay updated with the latest trends and news in cybersecurity.",
      imagePath: "/assets/MainBlog1.jpg",
      admin: { name: "Admin" }
    },
    {
      id: "main2",
      name: "Top Security Tips",
      detail: "Learn the top tips to keep your data and devices secure.",
      imagePath: "/assets/MainBlog3.webp",
      admin: { name: "Admin" }
    },
    // Add more fallback featured blogs as needed
  ];

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `Posted on ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  if (loading && !blogs.length) {
    return (
      <div className="bg-[#161831] min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <p className="text-xl">Loading blogs...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !blogs.length) {
    return (
      <div className="bg-[#161831] min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <p className="text-xl text-red-500">{error}</p>
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
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            className="mb-8"
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 3000 }}
          >
            {featuredBlogs.map(blog => (
              <SwiperSlide key={blog.id}>
                <div onClick={() => handleBlogClick(blog.id)} className="">
                  <MainBlog
                    title={blog.name}
                    description={blog.detail}
                    imageSrc={blog.imagePath}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="flex flex-wrap -mx-4">
            {blogs.slice(0, showAllBlogs ? blogs.length : 8).map(blog => (
              <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <BlogCard
                  title={blog.name}
                  postTime={formatDate(blog.createdAt) || `Posted by ${blog.admin?.name || 'Admin'}`}
                  onClick={() => handleBlogClick(blog.id)}
                  imageSrc={blog.imagePath}
                />
              </div>
            ))}
          </div>
          {!showAllBlogs && blogs.length > 8 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllBlogs(true)}
                className=" text-white px-8 py-3 rounded-[10px] border border-white "
              >
                View All
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;