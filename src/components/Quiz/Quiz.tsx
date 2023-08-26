"use client";

import { type Prisma } from "@prisma/client";
import { QuizQuestion } from "../QuizQuestion";

export interface QuizProps {
  quiz: Prisma.QuizGetPayload<{
    include: {
      questions: true;
    };
  }>;
}

export function Quiz({ quiz: { title, questions } }: QuizProps) {
  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold text-primary mb-6">{title}</h1>
      {questions.map((question) => (
        <QuizQuestion key={question.title} question={question} />
      ))}
    </div>
  );
}
