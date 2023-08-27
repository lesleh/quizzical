import path from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import nextEnv from "@next/env";
import { PrismaClient } from "@prisma/client";
import response from "../data/responses/sample.json";

const projectDirectory = path.resolve(fileURLToPath(import.meta.url), "../../");
nextEnv.loadEnvConfig(projectDirectory);

const content = response.choices[0].message.content;

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
    title: "Harry Potter",
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
