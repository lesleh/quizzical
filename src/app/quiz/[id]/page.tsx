import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import prisma from "@/lib/prisma";
import Link from "next/link";

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
    <main className="min-h-full max-w-4xl mx-auto p-4 grid grid-rows-[auto,_auto,_auto_,1fr] gap-4">
      <Link href="/" className="underline">
        Back
      </Link>
      <Quiz quiz={quiz} />
    </main>
  );
}
