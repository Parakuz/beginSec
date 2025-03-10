"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // ใช้ไอคอนแจ้งถูกผิด

export default function PostTestModal({ onClose }) {
  const questions = [
    {
      question: "ข้อใดต่อไปนี้เป็นองค์ประกอบพื้นฐานของ Cybersecurity?",
      choices: [
        "การเข้ารหัสข้อมูล การจัดเก็บข้อมูล และการสำรองข้อมูล",
        "Confidentiality, Integrity, และ Availability",
        "การสร้างรหัสผ่านที่มั่นคงและเปลี่ยนรหัสผ่านบ่อย ๆ",
        "Firewall, Antivirus และ VPN",
      ],
      correctAnswer: 1,
    },
    {
      question: "“Confidentiality” ใน Cybersecurity หมายถึงอะไร?",
      choices: [
        "การป้องกันไม่ให้ข้อมูลถูกเปิดเผยต่อผู้ที่ไม่มีสิทธิ์อนุญาต",
        "การป้องกันไม่ให้ข้อมูลสูญหายหรือถูกทำลาย",
        "การป้องกันไม่ให้มีการรบกวนระบบ",
        "การให้ข้อมูลสามารถเข้าถึงได้ตลอดเวลา",
      ],
      correctAnswer: 0,
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (index, choiceIndex) => {
    if (!isSubmitted) {
      setSelectedAnswers({ ...selectedAnswers, [index]: choiceIndex });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Post-test Exam</h2>
        {questions.map((q, index) => {
          const isCorrect = selectedAnswers[index] === q.correctAnswer;
          const isAnswered = selectedAnswers[index] !== undefined;

          return (
            <div key={index} className="mb-4">
              <p className="font-medium">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2 mt-2">
                {q.choices.map((choice, choiceIndex) => {
                  const isUserChoice = selectedAnswers[index] === choiceIndex;
                  const isCorrectChoice = choiceIndex === q.correctAnswer;

                  return (
                    <label
                      key={choiceIndex}
                      className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md 
                      ${
                        isSubmitted && isUserChoice && isCorrect
                          ? "bg-green-100 border-green-500"
                          : ""
                      }
                      ${
                        isSubmitted && isUserChoice && !isCorrect
                          ? "bg-red-100 border-red-500"
                          : ""
                      }
                      ${
                        isSubmitted && isCorrectChoice
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={choiceIndex}
                        checked={isUserChoice}
                        onChange={() => handleSelect(index, choiceIndex)}
                        className="accent-blue-500"
                        disabled={isSubmitted}
                      />
                      <span className="flex items-center">
                        {choice}
                        {isSubmitted &&
                          isUserChoice &&
                          (isCorrect ? (
                            <CheckCircle className="ml-2 text-green-500 w-5 h-5" />
                          ) : (
                            <XCircle className="ml-2 text-red-500 w-5 h-5" />
                          ))}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md w-full mt-4"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
