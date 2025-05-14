"use client";

import BoxForLesson from "@/components/learning-path/reuseable/BoxForLesson";
import LessonTabs from "@/components/learning-path/LessonTabs";
import PostTestModal from "@/components/learning-path/PostTest";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LearningPathPage() {
  const { pageId } = useParams();
  const [learningPath, setLearningPath] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});
  const [showPostTest, setShowPostTest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();
        if (data.userId) {
          setCurrentUserId(String(data.userId));
        } else {
          setFeedback("❌ User not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFeedback("❌ Error fetching user data.");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      async function fetchLearningPath() {
        try {
          const res = await fetch(`/api/course/${pageId}`);
          if (!res.ok) throw new Error("Failed to fetch course data");

          const data = await res.json();
          setLearningPath(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchLearningPath();
    }, 500);
  }, [pageId]);

  useEffect(() => {
    setTimeout(() => {
      async function fetchCompletedLessons() {
        try {
          const res = await fetch(
            `/api/user/course?userId=${Number(
              currentUserId
            )}&courseId=${pageId}`
          );
          if (!res.ok) throw new Error("Failed to fetch completed lessons");

          const data = await res.json();
          setCompletedLessons(data.completedLessons);

          if (learningPath) {
            const totalLessons = learningPath.sections.length;
            const completedCount = Object.values(data.completedLessons).filter(
              Boolean
            ).length;
            const newProgress = (completedCount / totalLessons) * 100;
            setProgress(newProgress);

            if (newProgress === 100) {
              setShowPostTest(true);
            }
          }
        } catch (err) {
          setError(err.message);
        }
      }

      if (pageId) {
        fetchCompletedLessons();
      }
    }, 1000);
  }, [pageId, learningPath]);

  useEffect(() => {
    if (learningPath && Object.keys(completedLessons).length > 0) {
      const totalLessons = learningPath.sections.length;
      const completedCount =
        Object.values(completedLessons).filter(Boolean).length;
      const newProgress = (completedCount / totalLessons) * 100;
      setProgress(newProgress);

      if (newProgress === 100) {
        setShowPostTest(true);
      }
    }
  }, [completedLessons, learningPath]);

  if (loading) {
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
  }

  if (!learningPath) {
    return (
      <p className="text-center text-red-500 text-lg">
        Learning Path not found
      </p>
    );
  }

  const totalLessons = learningPath.sections.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;

  return (
    <div className="max-w-screen-xl mx-auto text-white">
      <div className="relative w-full h-[386px] mx-auto rounded-lg shadow-md overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat blur-xl"
          style={{ backgroundImage: `url(${learningPath.imagePath})` }}
        ></div>

        <div className="relative flex justify-center items-center gap-[75px] p-6">
          <div className="w-[352px] h-[280px] rounded-[10px] bg-cover bg-center bg-no-repeat shadow-md">
            <img
              src={learningPath.imagePath}
              alt={learningPath.name}
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <h1 className="text-4xl font-bold text-white font-ibmthai">
              {learningPath.name}
            </h1>
            <p className="text-gray-400 max-w-lg font-ibmthai">
              {learningPath.detail}
            </p>

            <div className="flex gap-4">
              <BoxForLesson title="Lessons" count={totalLessons} />
              <BoxForLesson title="Completed" count={completedCount} />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-[474px] h-[32px] bg-[#D9D9D9] rounded-[41px] overflow-hidden relative">
                <div
                  className="bg-blue-500 h-full rounded-[41px] transition-all flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-white text-sm font-semibold z-10">
                    {`${Math.round(progress)} %`}
                  </span>
                </div>
              </div>

              <span className="text-sm font-semibold text-white">
                {`${completedCount}/${totalLessons}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <LessonTabs
        lessons={learningPath.sections}
        setCompletedLessons={setCompletedLessons}
        completedLessons={completedLessons}
      />
    </div>
  );
}
