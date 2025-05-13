"use client";
import LessonContent from "./reuseable/LessonContent";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LessonTabs({
  lessons,
  setCompletedLessons,
  completedLessons,
}) {
  const [activeLessons, setActiveLessons] = useState([]);

  const sortedData = lessons.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const isUnlocked = (id, sortedData) => {
    if (id === Number(sortedData[0].id)) return true;

    const currentLessonIndex = sortedData.findIndex(
      (lesson) => Number(lesson.id) === id
    );

    if (currentLessonIndex <= 0) return false;
    const previousLessonId = Number(sortedData[currentLessonIndex - 1].id);
    const completedIds = Object.keys(completedLessons).map(Number);
    return completedIds.includes(previousLessonId) && completedIds.length >= 1;
  };

  return (
    <div className="mt-10 mb-20 max-w-[1200px] mx-auto font-ibmthai">
      
      <div className="space-y-4">
        {sortedData.map((lesson, index) => {
          const isCompleted = completedLessons[lesson.id];
          const lessonRef = useRef(null);
          const isActive = activeLessons.includes(lesson.id);
          const isLocked = !isUnlocked(Number(lesson.id), sortedData);

          const toggleLesson = () => {
            if (isActive) {
              setActiveLessons(activeLessons.filter((id) => id !== lesson.id));
            } else {
              setActiveLessons([...activeLessons, lesson.id]);
              setTimeout(() => {
                lessonRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }
          };
          
          return (
            <motion.div
              key={lesson.id}
              ref={lessonRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-lg ${
                isActive ? "bg-[#1E2040]" : "bg-[#1A1C36]"
              } transition-all duration-300 border border-[#2A2E57]`}
            >
              <button
                className={`w-full p-5 flex items-center justify-between transition-all duration-300 ${
                  isLocked
                    ? "text-gray-500 opacity-50 cursor-not-allowed"
                    : isCompleted
                    ? "text-green-300 hover:bg-[#242851]"
                    : "text-white hover:bg-[#242851]"
                }`}
                onClick={toggleLesson}
                disabled={isLocked}
              >
                <div className="flex items-center">
                  <span className="mr-4 flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-400"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    ) : isLocked ? (
                      <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm font-medium">{index + 1}</span>
                      </div>
                    )}
                  </span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{lesson.name}</h3>
                    {lesson.description && (
                      <p className="text-sm text-gray-400 mt-1">{lesson.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {lesson.labName && (
                    <div className="flex items-center gap-1 bg-indigo-900/30 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-400"
                      >
                        <rect width="18" height="12" x="3" y="6" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      <span className="text-xs text-indigo-300">แล็บ</span>
                    </div>
                  )}
                  
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-[#2A2E57]"
                  >
                    <div className="p-5 bg-[#1E2040]">
                      <LessonContent
                        lesson={lesson}
                        setCompletedLessons={setCompletedLessons}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
