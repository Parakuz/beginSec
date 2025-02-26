"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../components/homepage/navbar";
import Footer from "../../components/homepage/Footer";

const blogData = [
  {
    id: "1",
    title: "Best Practices for Staying Safe Online",
    postTime: "Posted on September 25, 2023",
    imageSrc: "/assets/blog1.png",
    content: "Content for blog post 1"
  },
  {
    id: "2",
    title: "How to Protect Your Personal Data",
    postTime: "Posted on September 20, 2023",
    imageSrc: "/assets/blog2.jpg",
    content: "Content for blog post 2"
  },
  {
    id: "3",
    title: "The Importance of Regular Software Updates",
    postTime: "Posted on September 15, 2023",
    imageSrc: "/assets/blog3.webp",
    content: "Content for blog post 3"
  },
  {
    id: "4",
    title: "Recognizing Phishing Scams",
    postTime: "Posted on September 10, 2023",
    imageSrc: "/assets/blog4.webp",
    content: "Content for blog post 4"
  },
  {
    id: "5",
    title: "Understanding Cybersecurity Threats",
    postTime: "Posted on September 5, 2023",
    imageSrc: "/assets/blog5.jpg",
    content: "Content for blog post 5"
  },
  {
    id: "6",
    title: "Tips for Secure Online Shopping",
    postTime: "Posted on September 1, 2023",
    imageSrc: "/assets/blog6.png",
    content: "Content for blog post 6"
  },
  {
    id: "7",
    title: "The Role of Encryption in Data Security",
    postTime: "Posted on August 28, 2023",
    imageSrc: "/assets/blog7.jpeg",
    content: "Content for blog post 7"
  },
  {
    id: "8",
    title: "How to Create Strong Passwords",
    postTime: "Posted on August 25, 2023",
    imageSrc: "/assets/blog8.jpg",
    content: "Content for blog post 8"
  },
  {
    id: "9",
    title: "The Future of Cybersecurity",
    postTime: "Posted on August 20, 2023",
    imageSrc: "/assets/blog9.webp",
    content: "Content for blog post 9"
  },
  {
    id: "10",
    title: "Protecting Your Privacy on Social Media",
    postTime: "Posted on August 15, 2023",
    imageSrc: "/assets/blog10.jpg",
    content: "Content for blog post 10"
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
    imageSrc: "/assets/MainBlog2.png"
  },
  {
    id: "main3",
    title: "Upcoming Events",
    description: "Don't miss out on important cybersecurity events and webinars.",
    imageSrc: "/assets/blog9.webp"
  },
  {
    id: "main4",
    title: "Cybersecurity for Small Businesses",
    description: "Protect your small business from cyber threats.",
    imageSrc: "/assets/main4.jpg"
  },
  {
    id: "main5",
    title: "Cloud Security Best Practices",
    description: "Learn how to secure your data in the cloud.",
    imageSrc: "/assets/main5.jpg"
  },
  {
    id: "main6",
    title: "Mobile Security Tips",
    description: "Keep your mobile devices secure with these tips.",
    imageSrc: "/assets/main6.jpg"
  },
  {
    id: "main7",
    title: "IoT Security Challenges",
    description: "Understand the security challenges of IoT devices.",
    imageSrc: "/assets/main7.jpg"
  },
  {
    id: "main8",
    title: "Data Breach Response",
    description: "Learn how to respond to a data breach effectively.",
    imageSrc: "/assets/main8.jpg"
  },
  {
    id: "main9",
    title: "Cybersecurity Certifications",
    description: "Explore the top cybersecurity certifications.",
    imageSrc: "/assets/main9.jpg"
  },
  {
    id: "main10",
    title: "AI in Cybersecurity",
    description: "Discover how AI is transforming cybersecurity.",
    imageSrc: "/assets/main10.jpg"
  }
];

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    // Fetch the blog post data based on the id
    const fetchBlogPost = async () => {
      try {
        let data = blogData.find(post => post.id === id);
        if (!data) {
          data = mainBlogData.find(post => post.id === id);
        }
        setBlogPost(data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#161831]">
      <div className="min-h-screen text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
          <p className="text-gray-400 mb-4">{blogPost.postTime || blogPost.description}</p>
          <img
            className=" h-[488px]"
            src={blogPost.imageSrc}
            alt={blogPost.title}
          />
          <div className="text-lg">{blogPost.content || blogPost.description}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
