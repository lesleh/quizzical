import _ from "lodash";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const [subject] = process.argv.slice(2);

const projectDirectory = path.resolve(fileURLToPath(import.meta.url), "../../");
nextEnv.loadEnvConfig(projectDirectory);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: `Write me a list of 10 multiple choice ${subject} quiz questions and answers. Use the following format for each question:\n\n1. In the movie Back to the Future, what is the name of Doc Brown's dog?\n\na) Einstein\nb) Newton\nc) Tesla\nd) Baxter\n\nAnswer: a) Einstein`,
    },
  ],
});

const content = response.choices[0].message.content!;

const questions = _.chunk(content.split("\n\n"), 3).map(
  ([questionText, optionsText, correctAnswer]) => {
    const title = questionText.replace(/^\d+\. /, "");
    const options = optionsText
      .split("\n")
      .map((option) => option.replace(/\w+\) /, "").trim());
    const correctOption = correctAnswer.replace(/^Answer: \w+\) /, "").trim();

    return {
      title,
      options,
      correctOption,
    };
  },
);

const client = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL_NON_POOLING,
});

const result = await client.quiz.create({
  data: {
    title: subject,
    questions: {
      create: questions,
    },
  },
});

console.log(result);

// const result2 = await client.quiz.findFirst({
//   include: {
//     questions: true,
//   },
// });
// console.log(result2);

await client.$disconnect();
