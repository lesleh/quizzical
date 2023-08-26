"use client";

import { Question, Quiz as QuizType } from "@/types";
import { QuizQuestion } from "../QuizQuestion";

export interface QuizProps {
  quiz: QuizType;
}

export function Quiz({ quiz: { title, description, questions } }: QuizProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {questions.map((question) => (
        <QuizQuestion key={question.question} question={question} />
      ))}
    </div>
  );
}
