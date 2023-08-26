"use client";

import { Quiz as QuizType } from "@/types";
import { QuizQuestion } from "../QuizQuestion";

export interface QuizProps {
  quiz: QuizType;
}

export function Quiz({ quiz: { title, description, questions } }: QuizProps) {
  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold text-primary mb-6">{title}</h1>
      <p className="text-2xl text-primary">{description}</p>
      {questions.map((question) => (
        <QuizQuestion key={question.question} question={question} />
      ))}
    </div>
  );
}
