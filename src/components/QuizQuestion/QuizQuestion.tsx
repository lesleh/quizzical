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
    setSelectedOption(e.target.value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("You chose x");
  }

  return (
    <form onSubmit={onSubmit}>
      <p>{question.question}</p>
      {question.options.map((option) => (
        <label key={option} className="label justify-start gap-5">
          <input
            onChange={onChange}
            type="radio"
            className="radio"
            name="answer"
            value={option}
          />
          <span className="label-text">{option}</span>
        </label>
      ))}
      <button
        className={clsx("btn btn-primary", {
          "btn-disabled": !selectedOption,
        })}
      >
        Save
      </button>
    </form>
  );
}
