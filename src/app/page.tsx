import { Quiz } from "@/components/Quiz";

const quiz = {
  title: "Sample Quiz",
  description: "Sample description",
  questions: [
    {
      question: "Sample Question",
      options: [
        "Sample answer 1",
        "Sample answer 2",
        "Sample answer 3",
        "Sample answer 4",
      ],
      correctOption: "Sample answer 3",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <Quiz quiz={quiz} />
      </div>
    </main>
  );
}
