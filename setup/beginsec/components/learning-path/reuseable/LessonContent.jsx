import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function LessonContent({
  lesson,
  setCompletedLessons,
  completedLessons,
}) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [labStarted, setLabStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [port, setPort] = useState(null);
  const [checked, setChecked] = useState(false);

  // console.log("completedLessons", completedLessons);
  // console.log("LessonsId", lesson.id);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();
        if (data.userId) {
          setCurrentUserId(data.userId);
          if (lesson.labName?.startsWith("Lab")) {
            fetchLabStatus(data.userId);
          }
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
    if (remainingTime > 0) {
      const id = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            terminateLab();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [remainingTime]);

  const fetchLabStatus = async (userId) => {
    try {
      const res = await fetch("/api/lab/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.remainingTime) {
        setLabStarted(true);
        setPort(data.port);
        setRemainingTime(data.remainingTime);
      }
    } catch (error) {
      console.error("Error fetching lab status:", error);
    }
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const randomizedQuestions = useMemo(() => {
    return lesson.questions.map((q) => ({
      ...q,
      choices: q.choices ? shuffleArray(q.choices.split(",")) : null,
    }));
  }, [lesson.questions]);

  const checkAnswers = async () => {
    if (!currentUserId) {
      setFeedback("❌ Session expired. Please log in again.");
      return;
    }

    if (randomizedQuestions.length > 0) {
      const unanswered = randomizedQuestions.some((q) => !answers[q.question]);
      if (unanswered) {
        setFeedback("❌ กรุณาตอบคำถามให้ครบทุกข้อก่อนตรวจคำตอบ");
        return;
      }
    }

    const correctAnswersCount = randomizedQuestions.reduce((count, q) => {
      const userAnswer = answers[q.question]?.trim().toLowerCase();
      const correctAnswer = q.answer.trim().toLowerCase();
      return userAnswer === correctAnswer ? count + 1 : count;
    }, 0);

    setChecked(true);

    try {
      const response = await fetch(
        `/api/user/course/${currentUserId}/${lesson.courseId}/${lesson.id}`
      );
      const data = await response.json();

      let progressData = {
        userId: currentUserId,
        courseId: lesson.courseId,
        sectionId: lesson.id,
      };

      const totalQuestions = randomizedQuestions.length;
      const scorePercentage = (correctAnswersCount / totalQuestions) * 100;
      if (lesson.name === "Pre Test") {
        if (data.IsPreTestCompleted) {
          setFeedback("✅ You have already completed the Pre Test!");
          return;
        }
        progressData.IsPreTestCompleted = true;
        progressData.PretestScore = scorePercentage;
      } else if (lesson.name === "Post Test") {
        if (data.PosttestScore === 100) {
          setFeedback("✅ You have already done with this section!");
          return;
        }
        progressData.PosttestScore = Math.max(
          data.PosttestScore || 0,
          scorePercentage
        );
        progressData.PosttestAttempts = (data.PosttestAttempts || 0) + 1;
      } else {
        if (correctAnswersCount === totalQuestions) {
          progressData.SectionProgress = true;
        } else {
          setFeedback(
            `❌ You got ${correctAnswersCount} / ${totalQuestions} correct.`
          );
          return;
        }
      }

      await fetch("/api/user/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      setFeedback(
        correctAnswersCount === totalQuestions
          ? randomizedQuestions.length === 0
            ? "✅ Go to next session"
            : "✅ All answers are correct!"
          : `❌ You got ${correctAnswersCount} / ${totalQuestions} correct.`
      );

      if (
        correctAnswersCount === totalQuestions ||
        lesson.name === "Pre Test" ||
        (lesson.name === "Post Test" && scorePercentage >= 80)
      ) {
        if (lesson.name === "Post Test" && scorePercentage >= 80) {
          toast.success(
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                คุณได้รับ Badge ของบทเรียนนี้สามารถ check ได้ที่หน้า Profile
                หากเรียนครบทุกบทสามารถรับ Certificate ได้
              </span>
            </div>,
            {
              icon: false,
              style: {
                fontFamily: "Prompt, sans-serif",
                fontSize: "1rem",
                borderRadius: "8px",
                padding: "12px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
              },
            }
          );
        }
        setCompletedLessons((prev) => ({ ...prev, [lesson.id]: true }));
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const startLabEngine = async () => {
    if (!currentUserId || !lesson.labName) {
      setFeedback("❌ Cannot start lab. Missing user ID or lab name.");
      return;
    }

    try {
      const res = await fetch("/api/lab/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          labName: lesson.labName,
        }),
      });
      let progressData = {
        userId: currentUserId,
        courseId: lesson.courseId,
        sectionId: lesson.id,
        SectionProgress: true,
      };
      const res2 = await fetch("/api/user/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      const data = await res.json();

      if (res.ok && res2.ok) {
        setCompletedLessons((prev) => ({ ...prev, [lesson.id]: true }));
        setLabStarted(true);
        setRemainingTime(data.remainingTime || 3600);
        setPort(data.port);
        setFeedback("✅ Lab started successfully!");

        const id = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              clearInterval(id);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setIntervalId(id);
      } else {
        setFeedback(`❌ Failed to start lab: ${data.error}`);
      }
    } catch (error) {
      console.error("Error starting lab:", error);
      setFeedback("❌ Error starting the lab.");
    }
  };

  const extendLabTime = async () => {
    if (remainingTime + 1800 <= 7200) {
      setRemainingTime((prev) => prev + 1800);
      try {
        const res = await fetch("/api/lab/extend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUserId,
            labName: lesson.labName,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setFeedback(`❌ Failed to extend lab time: ${data.error}`);
        }
      } catch (error) {
        console.error("Error extending lab time:", error);
        setFeedback("❌ Error extending the lab time.");
      }
    } else {
      setFeedback("❌ Cannot extend time. Maximum of 2 hours reached.");
    }
  };

  const terminateLab = async () => {
    setLabStarted(false);
    clearInterval(intervalId);
    try {
      const res = await fetch("/api/lab/terminate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          labName: lesson.labName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRemainingTime(0);
        setFeedback("✅ Lab terminated.");
      } else {
        console.error(`❌ Failed to terminate lab: ${data.error}`);
      }
    } catch (error) {
      console.error("Error terminating lab:", error);
      console.error("❌ Error terminating the lab.");
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const updatedAnswers = {};

    randomizedQuestions.forEach((q) => {
      const shouldAutofill =
        completedLessons[lesson.id] &&
        lesson.name !== "Pre Test" &&
        lesson.name !== "Post Test" &&
        !answers[q.question]; // อย่าเขียนทับถ้าคนตอบเองแล้ว

      if (shouldAutofill) {
        updatedAnswers[q.question] = q.answer.trim();
      }
    });

    if (Object.keys(updatedAnswers).length > 0) {
      setAnswers((prev) => ({
        ...prev,
        ...updatedAnswers,
      }));
    }
  }, [randomizedQuestions, completedLessons, lesson.id, lesson.name]);

  return (
    <div className="mt-4">
      <div className="lesson-quill text-base sm:text-lg md:text-xl leading-relaxed">
        <ReactQuill
          value={lesson.detail || "<p>Lesson content here.</p>"}
          readOnly={true}
          theme="snow"
          modules={{ toolbar: false }}
          onFocus={(e) => {
            e.preventDefault();
          }}
          className="lesson-quill border-none font-ibmthai"
        />
      </div>
      {lesson.labName?.startsWith("Lab") && (
        <button
          onClick={
            labStarted
              ? () => window.open(`http://3.104.224.60:${port}`, "_blank")
              : startLabEngine
          }
          className="w-full h-[50px] bg-gradient-to-r from-[#6231D5] to-[#8A63FF] rounded-lg text-white font-semibold mb-6 hover:from-[#8A63FF] hover:to-[#6231D5] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-[#9B7DFF]/30"
        >
          {labStarted ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Go to Lab
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Start Lab
            </>
          )}
        </button>
      )}
      {/* labStarted && */}
      {labStarted && (
        <div className="flex flex-col gap-4 mt-4 p-6 bg-gradient-to-br from-[#2E2E2E] to-[#1A1A1A] rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-semibold">Lab Status</h3>
            <div className="px-4 py-2 bg-[#1E1E1E] rounded-full border border-gray-600 shadow-inner">
              <p className="text-white font-medium flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Remaining Time: {formatTime(remainingTime)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <button
              onClick={extendLabTime}
              className="h-[45px] bg-gradient-to-r from-[#32CD32] to-[#28a745] rounded-md text-white font-semibold hover:from-[#28a745] hover:to-[#218838] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Extend Time (+30 minutes)
            </button>

            <button
              onClick={terminateLab}
              className="h-[45px] bg-gradient-to-r from-[#FF4500] to-[#e43b00] rounded-md text-white font-semibold hover:from-[#e43b00] hover:to-[#d43500] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Terminate Lab
            </button>
          </div>
        </div>
      )}

      {randomizedQuestions.map((q, index) => (
        <div key={index} className="my-2 mb-6">
          <p className="text-gray-200">
            {index + 1}. {q.question}
          </p>

          {lesson.labName ? (
            <div className="relative mt-2">
              <input
                type="text"
                className="w-full p-3 pl-4 pr-10 rounded-lg border-2 border-[#2A2E57] bg-[#1A1C36] text-white font-ibmthai focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                value={answers[q.question] || ""}
                placeholder="พิมพ์คำตอบจากแล็บที่นี่..."
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.question]: e.target.value,
                  }))
                }
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              {q.choices.map((choice) => {
                const shouldHighlight =
                  completedLessons[lesson.id] &&
                  lesson.name !== "Pre Test" &&
                  lesson.name !== "Post Test";
                console.log(shouldHighlight);
                const isCorrect =
                  checked &&
                  answers[q.question]?.trim().toLowerCase() ===
                    q.answer.trim().toLowerCase();
                const isWrong = checked && answers[q.question] !== q.answer;
                return (
                  <label
                    key={choice}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                      answers[q.question] === choice
                        ? isCorrect || shouldHighlight
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : isWrong
                          ? "border-red-500 bg-red-500/20 text-red-300"
                          : "border-blue-500 bg-blue-500/20 text-blue-300"
                        : "border-gray-700 bg-[#1A1C36] hover:border-gray-500 text-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                        answers[q.question] === choice
                          ? isCorrect || shouldHighlight
                            ? "border-green-500 bg-green-500"
                            : isWrong
                            ? "border-red-500 bg-red-500"
                            : "border-blue-500 bg-blue-500"
                          : "border-gray-500"
                      }`}
                    >
                      {answers[q.question] === choice && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      name={q.question}
                      value={choice}
                      onChange={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          [q.question]: choice,
                        }));
                        setChecked(false);
                      }}
                      className="hidden"
                    />
                    <span className="font-ibmthai">{choice}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
      {!lesson.labName?.startsWith("Lab") && (
        <div className="flex justify-end mt-4 space-x-8">
          {lesson.name === "Post Test" && (
            <Link
              href="/learning-path"
              className="w-[162px] h-[46px] bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold flex items-center justify-center"
            >
              Learning Path
            </Link>
          )}
          <button
            onClick={() => {
              if (randomizedQuestions.length === 0) {
                terminateLab();
              }
              checkAnswers();
            }}
            className="w-[162px] h-[46px] bg-[#84D92F] rounded-md text-white font-semibold"
          >
            {randomizedQuestions.length === 0
              ? "Next Session"
              : "Check Answers"}
          </button>
        </div>
      )}

      {feedback && (
        <div className="mt-2 text-center text-xl text-green-600">
          {feedback}
        </div>
      )}
    </div>
  );
}
