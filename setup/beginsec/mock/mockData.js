export const mockLearningPaths = {
  1: {
    id: "123",
    title: "Introduction to Cybersecurity",
    description: "Learn the basics of cybersecurity to secure your future.",
    image: "/learning-path/fundamental.png",
    backgroundImage: "/learning-path/bg-fundamental.png",
    lessons: [
      {
        id: "lesson-1",
        title: "What is Cybersecurity?",
        lab: "Hello world",
        content: `<p>test</p>`,
        questions: [
          {
            question: "What is the main goal of cybersecurity?",
            choices: [
              "Protecting systems",
              "Hacking systems",
              "Ignoring threats",
            ],
            answer: "Protecting systems",
          },
          {
            question: "Which of the following is a cyber threat?",
            choices: ["Malware", "Firewall", "Encryption"],
            answer: "Malware",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Understand threat of cyber?",
        // lab: "Hello world",
        contentBlocks: [
          {
            type: "text",
            content: "Cybersecurity is the practice of protecting systems...",
          },
          {
            type: "image",
            src: "/learning-path/fun-content-1.png",
            alt: "Cybersecurity diagram",
          },
          {
            type: "text",
            content: "Cybersecurity is the practice of protecting systems...",
          },
          {
            type: "list",
            style: "list-disc",
            items: [
              "Protects against cyber threats",
              "Ensures data confidentiality",
              "Prevents unauthorized access",
            ],
          },
        ],
        questions: [
          {
            question: "What is the main goal of cybersecurity?",
            choices: [
              "Protecting systems",
              "Hacking systems",
              "Ignoring threats",
            ],
            answer: "Protecting systems",
          },
          {
            question: "Which of the following is a cyber threat?",
            choices: ["Malware", "Firewall", "Encryption"],
            answer: "Malware",
          },
        ],
      },
    ],
  },
};
