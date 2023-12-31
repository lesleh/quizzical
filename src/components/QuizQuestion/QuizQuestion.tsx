"use client";

import clsx from "clsx";
import { FormEvent, useState } from "react";
import { type Question } from "@prisma/client";

export interface QuestionProps {
  question: Question;
  onMoveNext: (correct: boolean) => void;
}

export function QuizQuestion({ question, onMoveNext }: QuestionProps) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function onChange(e: FormEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setSelectedOption(value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnswer(selectedOption);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid max-sm:grid-rows-[auto,_1fr_,auto] sm:place-content-start gap-4"
    >
      <p className="text-2xl text-primary font-semibold">{question.title}</p>
      <div className="mt-4 mb-5">
        {question.options.map((option) => (
          <label key={option} className="label justify-start gap-5">
            <input
              onChange={onChange}
              type="radio"
              className="radio radio-secondary"
              name="answer"
              value={option}
            />
            <span className="label-text text-lg">
              {option}

              {answer && option === question.correctOption && (
                <span className="text-green-600"> ✓</span>
              )}
              {answer &&
                answer === option &&
                option !== question.correctOption && (
                  <span className="text-red-600"> ✗</span>
                )}
            </span>
          </label>
        ))}
      </div>
      <div className="flex flex-row-reverse gap-5 items-center justify-between">
        {(answer && (
          <button
            type="button"
            onClick={() => onMoveNext(answer === question.correctOption)}
            className={clsx("btn btn-primary")}
          >
            Next
          </button>
        )) || (
          <button type="submit" className={clsx("btn btn-primary")}>
            Submit
          </button>
        )}
        {answer && (
          <div>
            {answer === question.correctOption ? "Correct!" : "Incorrect!"}
          </div>
        )}
      </div>
    </form>
  );
}
