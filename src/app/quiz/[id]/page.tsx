import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import prisma from "@/lib/prisma";

export default async function QuizPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const quiz = await prisma.quiz.findFirst({
    where: { id: parseInt(id, 10) },
    include: { questions: true },
  });

  if (!quiz) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Quiz quiz={quiz} />
    </main>
  );
}
