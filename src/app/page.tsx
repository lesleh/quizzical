import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <main className="max-w-4xl mx-auto my-8">
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <Link href={`/quiz/${quiz.id}`}>{quiz.title}</Link>
        </div>
      ))}
    </main>
  );
}
