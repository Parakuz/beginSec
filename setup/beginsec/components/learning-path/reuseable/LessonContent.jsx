import { useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function LessonContent({ lesson, setCompletedLessons }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();
        if (data.userId) {
          setCurrentUserId(data.userId);
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

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const randomizedQuestions = useMemo(() => {
    return lesson.questions.map((q) => ({
      ...q,
      choices: shuffleArray(q.choices.split(",")),
    }));
  }, [lesson.questions]);

  const checkAnswers = async () => {
    if (!currentUserId) {
      setFeedback("❌ Session expired. Please log in again.");
      return;
    }

    const correctAnswersCount = randomizedQuestions.reduce((count, q) => {
      return answers[q.question] === q.answer ? count + 1 : count;
    }, 0);

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

      // console.log(progressData);
      await fetch("/api/user/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      setFeedback(
        correctAnswersCount === totalQuestions
          ? "✅ All answers are correct!"
          : `❌ You got ${correctAnswersCount} / ${totalQuestions} correct.`
      );

      if (
        correctAnswersCount === totalQuestions ||
        lesson.name === "Pre Test" ||
        lesson.name === "Post Test"
      ) {
        setCompletedLessons((prev) => ({ ...prev, [lesson.id]: true }));
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  return (
    <div className="mt-4">
      <ReactQuill
        value={
          lesson.detail ||
          "<p>This is a sample lesson content with <strong>bold</strong> text and an image below.</p><img src='image_url_here' alt='sample'/>"
        }
        readOnly={true}
        theme="snow"
        modules={{
          toolbar: false,
        }}
        className="lesson-quill border-none"
      />
      {randomizedQuestions.map((q, index) => (
        <div key={index} className="my-2">
          <p className="text-gray-200">
            {index + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-2">
            {q.choices.map((choice) => (
              <label
                key={choice}
                className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                  answers[q.question] === choice
                    ? "border-blue-100 bg-blue-500/55"
                    : "bg-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name={q.question}
                  value={choice}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q.question]: choice }))
                  }
                  className="hidden"
                />
                {choice}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={checkAnswers}
          className="w-[102px] h-[46px] bg-[#84D92F] rounded-md text-white font-semibold"
        >
          Submit
        </button>
      </div>

      {feedback && <p className="mt-2 font-semibold text-center">{feedback}</p>}
    </div>
  );
}
