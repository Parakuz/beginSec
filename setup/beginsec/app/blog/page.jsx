"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./cardbox/BlogCard";
import Navbar from "../components/homepage/navbar";
import Footer from "../components/homepage/Footer";
import { useRouter } from "next/navigation";
import MainBlog from "./cardbox/MainBlog";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // if you use navigation
import 'swiper/css/pagination'; // if you use pagination
import 'swiper/css/scrollbar'; // if you use scrollbar
import { Navigation, Autoplay } from 'swiper/modules'; // Correct import for Swiper modules

const BlogPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllBlogs, setShowAllBlogs] = useState(false); // State to toggle blog visibility

  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`);
  };

  const blogData = [
    {
      id: "1",
      title: "Best Practices for Staying Safe Online",
      postTime: "Posted on September 25, 2023",
      imageSrc: "/assets/blog1.jpg"
    },
    {
      id: "2",
      title: "How to Protect Your Personal Data",
      postTime: "Posted on September 20, 2023",
      imageSrc: "/assets/blog2.webp"
    },
    {
      id: "3",
      title: "The Importance of Regular Software Updates",
      postTime: "Posted on September 15, 2023",
      imageSrc: "/assets/blog3.jpg"
    },
    {
      id: "4",
      title: "Recognizing Phishing Scams",
      postTime: "Posted on September 10, 2023",
      imageSrc: "/assets/blog4.png"
    },
    {
      id: "5",
      title: "Understanding Cybersecurity Threats",
      postTime: "Posted on September 5, 2023",
      imageSrc: "/assets/blog5.jpg"
    },
    {
      id: "6",
      title: "Tips for Secure Online Shopping",
      postTime: "Posted on September 1, 2023",
      imageSrc: "/assets/blog6.webp"
    },
    {
      id: "7",
      title: "The Role of Encryption in Data Security",
      postTime: "Posted on August 28, 2023",
      imageSrc: "/assets/blog7.jpeg"
    },
    {
      id: "8",
      title: "How to Create Strong Passwords",
      postTime: "Posted on August 25, 2023",
      imageSrc: "/assets/blog8.jpg"
    },
    {
      id: "9",
      title: "The Future of Cybersecurity",
      postTime: "Posted on August 20, 2023",
      imageSrc: "/assets/blog9.jpg"
    },
    {
      id: "10",
      title: "Protecting Your Privacy on Social Media",
      postTime: "Posted on August 15, 2023",
      imageSrc: "/assets/blog10.jpg"
    }
  ];

  const mainBlogData = [
    {
      id: "main1",
      title: "Latest Cybersecurity News",
      description: "Stay updated with the latest trends and news in cybersecurity.",
      imageSrc: "/assets/MainBlog1.jpg"
    },
    {
      id: "main2",
      title: "Top Security Tips",
      description: "Learn the top tips to keep your data and devices secure.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main3",
      title: "Upcoming Events",
      description: "Don't miss out on important cybersecurity events and webinars.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main4",
      title: "Cybersecurity for Small Businesses",
      description: "Protect your small business from cyber threats.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main5",
      title: "Cloud Security Best Practices",
      description: "Learn how to secure your data in the cloud.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main6",
      title: "Mobile Security Tips",
      description: "Keep your mobile devices secure with these tips.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main7",
      title: "IoT Security Challenges",
      description: "Understand the security challenges of IoT devices.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main8",
      title: "Data Breach Response",
      description: "Learn how to respond to a data breach effectively.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main9",
      title: "Cybersecurity Certifications",
      description: "Explore the top cybersecurity certifications.",
      imageSrc: "/assets/MainBlog3.webp"
    },
    {
      id: "main10",
      title: "AI in Cybersecurity",
      description: "Discover how AI is transforming cybersecurity.",
      imageSrc: "/assets/MainBlog3.webp"
    }
  ];

  return (
    <div className="bg-[#161831]">
      <div className="min-h-screen text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            className="mb-8"
            modules={[Navigation, Autoplay]} // Ensure the Navigation and Autoplay modules are included
            autoplay={{ delay: 3000 }} // Add autoplay with a delay of 3000ms (3 seconds)
          >
            {mainBlogData.map(blog => (
              <SwiperSlide key={blog.id}>
                <div onClick={() => handleBlogClick(blog.id)} className="">
                  <MainBlog
                    title={blog.title}
                    description={blog.description}
                    imageSrc={blog.imageSrc}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="flex flex-wrap -mx-4">
            {blogData.slice(0, showAllBlogs ? blogData.length : 8).map(blog => (
              <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
                <BlogCard
                  title={blog.title}
                  postTime={blog.postTime}
                  onClick={() => handleBlogClick(blog.id)}
                  imageSrc={blog.imageSrc}
                />
              </div>
            ))}
          </div>
          {!showAllBlogs && (
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