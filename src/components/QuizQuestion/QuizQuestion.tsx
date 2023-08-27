"use client";

import clsx from "clsx";
import { FormEvent, useState } from "react";
import { type Question } from "@prisma/client";

export interface QuestionProps {
  question: Question;
}

export function QuizQuestion({ question }: QuestionProps) {
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
      className="my-10 border-solid border-gray-300 border-2 rounded-2xl p-10"
    >
      <p className="text-4xl text-primary font-semibold">{question.title}</p>
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
      <div className="flex gap-5 items-center">
        <button
          className={clsx("btn btn-primary", {
            "btn-disabled": !selectedOption || !!answer,
          })}
        >
          Submit
        </button>
        {answer && (
          <div>
            {answer === question.correctOption ? "Correct!" : "Incorrect!"}
          </div>
        )}
      </div>
    </form>
  );
}
