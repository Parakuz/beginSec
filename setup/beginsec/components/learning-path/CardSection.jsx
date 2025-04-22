"use client";
import { useEffect, useState } from "react";
import Card from "./reuseable/Card";

export default function CardSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course");
        const data = await response.json();
        const sortedCourses = data.sort((a, b) => a.id - b.id);
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 mt-32">
      <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -bottom-20 -left-80 -z-10"></div>

      {courses.length > 0 ? (
        courses.map((course) => (
          <Card
            key={course.id}
            href={course.path}
            src={course.imagePath}
            title={course.name}
            content={course.detail}
          />
        ))
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  );
}
