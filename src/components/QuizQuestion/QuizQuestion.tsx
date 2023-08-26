"use client";

import clsx from "clsx";
import { Question } from "@/types";
import { FormEvent, useState } from "react";

export interface QuestionProps {
  question: Question;
  // onAnswer: (chosenAnswer: string) => void;
}

export function QuizQuestion({ question }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function onChange(e: FormEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setSelectedOption(value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("You chose x");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="my-10 border-solid border-gray-300 border-2 rounded-2xl p-10"
    >
      <p className="text-4xl text-primary font-semibold">{question.question}</p>
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
            <span className="label-text text-lg">{option}</span>
          </label>
        ))}
      </div>
      <button
        className={clsx("btn btn-primary", {
          "btn-disabled": !selectedOption,
        })}
      >
        Submit
      </button>
    </form>
  );
}
