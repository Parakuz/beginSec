import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function LessonContent({ lesson, setCompletedLessons }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [labStarted, setLabStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [port, setPort] = useState(null);
  const [checked, setChecked] = useState(false);

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
          className="w-full h-[50px] bg-[#FFA500] rounded-md text-white font-semibold mb-6 hover:bg-[#ff8c00] transition-colors"
        >
          {labStarted ? "Go to Lab" : "Start Engine"}
        </button>
      )}

      {labStarted && (
        <div className="flex flex-col gap-4 mt-4 p-6 bg-[#2E2E2E] rounded-lg shadow-md">
          <p className="text-white text-xl font-semibold mb-4">
            Remaining Time: {formatTime(remainingTime)}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={extendLabTime}
              className="w-full h-[45px] bg-[#32CD32] rounded-md text-white font-semibold hover:bg-[#28a745] transition-colors"
            >
              Extend Time (+30 นาที)
            </button>

            <button
              onClick={terminateLab}
              className="w-full h-[45px] bg-[#FF4500] rounded-md text-white font-semibold hover:bg-[#e43b00] transition-colors"
            >
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
            <input
              type="text"
              className="w-full p-2 rounded-lg border-2 bg-gray-500 text-white"
              value={answers[q.question] || ""}
              placeholder="คำตอบที่ได้จาก Lab คือ ......"
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [q.question]: e.target.value,
                }))
              }
            />
          ) : (
            <div className="flex flex-col gap-2">
              {q.choices.map((choice) => {
                const isCorrect =
                  checked &&
                  answers[q.question]?.trim().toLowerCase() ===
                    q.answer.trim().toLowerCase();
                const isWrong = checked && answers[q.question] !== q.answer;
                return (
                  <label
                    key={choice}
                    className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                      answers[q.question] === choice
                        ? isCorrect
                          ? "border-green-500 bg-green-500/50"
                          : isWrong
                          ? "border-red-500 bg-red-500/50"
                          : "border-blue-100 bg-blue-500/55"
                        : "bg-gray-500"
                    }`}
                  >
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
                    {choice}
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
