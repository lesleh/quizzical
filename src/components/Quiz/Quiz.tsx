"use client";

import { type Prisma } from "@prisma/client";
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";

export interface QuizProps {
  quiz: Prisma.QuizGetPayload<{
    include: {
      questions: true;
    };
  }>;
}

export function Quiz({ quiz: { title, questions } }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  function onMoveNext(correct: boolean) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (correct) setCorrectAnswers(correctAnswers + 1);
  }

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold text-primary mb-6">{title}</h1>
      <progress
        className="progress progress-secondary"
        value={currentQuestionIndex + 1}
        max={questions.length + 1}
      ></progress>
      {currentQuestionIndex < questions.length ? (
        <div>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      ) : (
        <div>
          Done! You got {correctAnswers} out of {questions.length} right!
        </div>
      )}

      {currentQuestionIndex < questions.length ? (
        <QuizQuestion
          key={currentQuestionIndex}
          onMoveNext={onMoveNext}
          question={questions[currentQuestionIndex]}
        />
      ) : (
        <div>Done!</div>
      )}
    </div>
  );
}
