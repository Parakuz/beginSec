"use client";
import LessonContent from "./reuseable/LessonContent";
import { useState } from "react";

export default function LessonTabs({
  lessons,
  setCompletedLessons,
  completedLessons,
}) {
  const [activeLesson, setActiveLesson] = useState(null);

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
    <div className="mt-6 w-[1120px] mx-auto">
      {sortedData.map((lesson) => {
        const isCompleted = completedLessons[lesson.id];
        return (
          <div
            key={lesson.id}
            className="p-4 my-2 rounded-lg shadow bg-gray-800 flex flex-col"
          >
            <button
              className={`text-xl font-semibold flex items-center justify-between w-full 
                ${
                  !isUnlocked(Number(lesson.id), sortedData)
                    ? "text-gray-500 opacity-50 cursor-not-allowed"
                    : "text-gray-200"
                }`}
              onClick={() =>
                setActiveLesson(activeLesson === lesson.id ? null : lesson.id)
              }
              disabled={!isUnlocked(Number(lesson.id), sortedData)}
            >
              <div className="flex items-center">
                <span className="mr-3">
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z"
                        fill="#84D92F"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z"
                        fill="#929BA4"
                      />
                    </svg>
                  )}
                </span>
                {lesson.name}
              </div>
              {lesson.labName && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 21V19H23V21H1ZM4 18C3.45 18 2.97933 17.8043 2.588 17.413C2.19667 17.0217 2.00067 16.5507 2 16V5C2 4.45 2.196 3.97933 2.588 3.588C2.98 3.19667 3.45067 3.00067 4 3H20C20.55 3 21.021 3.196 21.413 3.588C21.805 3.98 22.0007 4.45067 22 5V16C22 16.55 21.8043 17.021 21.413 17.413C21.0217 17.805 20.5507 18.0007 20 18H4ZM4 16H20V5H4V16Z"
                    fill="white"
                  />
                </svg>
              )}
            </button>
            {activeLesson === lesson.id && (
              <LessonContent
                lesson={lesson}
                setCompletedLessons={setCompletedLessons}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
