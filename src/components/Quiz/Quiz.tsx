"use client";

import { type Prisma } from "@prisma/client";
import { QuizQuestion } from "../QuizQuestion";
import { useState } from "react";
import { ProgressBar } from "../ProgressBar";

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

  const progressBarCurrent = currentQuestionIndex + 1;
  const progressBarMaximum = questions.length + 1; // Add one to account for results screen
  const progressBarText =
    currentQuestionIndex < questions.length
      ? `Question ${currentQuestionIndex + 1} of ${questions.length}`
      : `Done! You got ${correctAnswers} out of ${questions.length} right!`;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
      <ProgressBar
        current={progressBarCurrent}
        maximum={progressBarMaximum}
        text={progressBarText}
      />

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
