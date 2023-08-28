import prisma from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <main className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-primary">Quizzical</h1>
      <ul className="list-disc list-inside">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="my-2">
            <Link href={`/quiz/${quiz.id}`} className="underline">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
