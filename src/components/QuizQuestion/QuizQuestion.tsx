"use client";

import { Question } from "@/types";
import { FormEvent } from "react";

export interface QuestionProps {
  question: Question;
  // onAnswer: (chosenAnswer: string) => void;
}

export function QuizQuestion(props: QuestionProps) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("You chose x");
  }

  return (
    <form onSubmit={onSubmit}>
      <p>Question?</p>
      <label className="block">
        <input type="radio" name="answer" /> Option 1
      </label>
      <label className="block">
        <input type="radio" name="answer" /> Option 2
      </label>
      <label className="block">
        <input type="radio" name="answer" /> Option 3
      </label>
      <label className="block">
        <input type="radio" name="answer" /> Option 4
      </label>
      <button>Save</button>
    </form>
  );
}
