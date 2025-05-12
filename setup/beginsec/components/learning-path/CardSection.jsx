"use client";
import { useEffect, useState } from "react";
import Card from "./reuseable/Card";
import { motion } from "framer-motion";

export default function CardSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const response = await fetch("/api/course");
        if (!response.ok) {
          throw new Error("Unable to fetch courses");
        }
        const data = await response.json();
        const sortedCourses = data.sort((a, b) => a.id - b.id);
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-xl mb-2">Error Occurred</div>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative mt-20 mb-16">
      {/* เพิ่ม gradient backgrounds */}
      <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -bottom-20 -left-80 -z-10"></div>
      <div className="absolute bg-gradient-to-tl from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-80 h-80 -top-10 -right-40 -z-10"></div>
      
      {/* ใช้ framer-motion สำหรับ animation */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      >
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div key={course.id} variants={item} className="h-full">
              <Card
                href={course.path}
                src={course.imagePath}
                title={course.name}
                content={course.detail}
                lang="th"
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">No courses found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
