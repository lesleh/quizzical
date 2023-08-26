import prisma from "@/lib/prisma";
import { Quiz } from "@/components/Quiz";

const quiz = {
  title: "Sample Quiz",
  description: "Sample description",
  questions: [
    {
      question: "Sample Question",
      options: [
        "Sample answer 1",
        "Sample answer 2",
        "Sample answer 3",
        "Sample answer 4",
      ],
      correctOption: "Sample answer 3",
    },
  ],
};

export default async function Home() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <main className="max-w-4xl mx-auto my-8">
      {quizzes.map((quizz) => (
        <div>{quizz.title}</div>
      ))}
    </main>
  );
}
