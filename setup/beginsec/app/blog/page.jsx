"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./cardbox/BlogCard";
// import Navbar from "../components/homepage/navbar";
// import Footer from "../components/homepage/Footer";
import { useRouter } from "next/navigation";
import MainBlog from "./cardbox/MainBlog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay } from "swiper/modules";

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
        const response = await fetch("/api/blogs");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        // For featured blogs, use the first 5 blogs
        // In a real application, you might have a featured flag in your database
        const featured = data.slice(0, 5);
        setFeaturedBlogs(featured);

        // For regular blogs, use the remaining blogs (excluding featured ones)
        // This ensures MainBlog and BlogCard don't show the same content
        const regular = data.filter(
          (blog) => !featured.some((fb) => fb.id === blog.id)
        );
        setBlogs(regular);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
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
      createdAt: "2023-09-25",
    },
    {
      id: "2",
      name: "How to Protect Your Personal Data",
      detail: "Content for blog post 2",
      imagePath: "/assets/blog2.webp",
      admin: { name: "Admin" },
      createdAt: "2023-09-20",
    },
    // Add more fallback blogs as needed
  ];

  const getFallbackFeaturedBlogs = () => [
    {
      id: "main1",
      name: "Latest Cybersecurity News",
      detail: "Stay updated with the latest trends and news in cybersecurity.",
      imagePath: "/assets/MainBlog1.jpg",
      admin: { name: "Admin" },
    },
    {
      id: "main2",
      name: "Top Security Tips",
      detail: "Learn the top tips to keep your data and devices secure.",
      imagePath: "/assets/MainBlog3.webp",
      admin: { name: "Admin" },
    },
    // Add more fallback featured blogs as needed
  ];

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  if (loading && !blogs.length) {
    return (
      <div className="bg-[#161831] min-h-screen text-white">
        {/* <Navbar /> */}
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <p className="text-xl">Loading blogs...</p>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (error && !blogs.length) {
    return (
      <div className="bg-[#161831] min-h-screen text-white">
        {/* <Navbar /> */}
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <p className="text-xl text-red-500">{error}</p>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <div className="bg-[#161831] relative overflow-hidden">
      {/* Navbar with higher z-index to ensure it's above the background effects */}
      <div className="relative z-20">{/* <Navbar /> */}</div>

      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ zIndex: 0, pointerEvents: "none" }}
      >
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#391A81]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#6231D5]/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="min-h-screen text-white">
        <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="mb-12"
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
          >
            {featuredBlogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div
                  onClick={() => handleBlogClick(blog.id)}
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <MainBlog
                    title={blog.name}
                    imageSrc={blog.imagePath}
                    postTime={formatDate(blog.postDate || blog.createdAt)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="border-b border-gray-700 my-10"></div>

          <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
          <div className="flex flex-wrap -mx-4">
            {blogs.slice(0, showAllBlogs ? blogs.length : 8).map((blog) => (
              <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <BlogCard
                  title={blog.name}
                  postTime={formatDate(blog.postDate || blog.createdAt)}
                  onClick={() => handleBlogClick(blog.id)}
                  imageSrc={blog.imagePath}
                />
              </div>
            ))}
          </div>
          {!showAllBlogs && blogs.length > 8 && (
            <div className="text-center mt-8 mb-4">
              <button
                onClick={() => setShowAllBlogs(true)}
                className="text-white px-8 py-3 rounded-[10px] border border-white hover:bg-white hover:text-[#161831] transition-colors"
              >
                View All Posts
              </button>
            </div>
          )}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default BlogPage;
