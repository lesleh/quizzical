export interface Question {
  question: string;
  options: string[];
  correctOption: string;
}

export interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}
