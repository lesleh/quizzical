import path from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import nextEnv from "@next/env";
import { PrismaClient } from "@prisma/client";
import response from "../data/responses/jurassic-park.json";

const projectDirectory = path.resolve(fileURLToPath(import.meta.url), "../../");
nextEnv.loadEnvConfig(projectDirectory);

const content = response.choices[0].message.content;

const questions = _.chunk(content.split("\n\n"), 2).map(
  ([questionAndOptions, correctAnswer]) => {
    const [question, ...options] = questionAndOptions.split("\n");

    return {
      title: question.replace(/^\d+\. /, ""),
      options: options.map((option) => option.replace(/\w+\) /, "").trim()),
      correctOption: correctAnswer.replace(/^Answer: \w+\) /, "").trim(),
    };
  },
);

const client = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL_NON_POOLING,
});

// const result = await client.quiz.create({
//   data: {
//     title: "Jurassic Park",
//     questions: {
//       create: questions,
//     },
//   },
// });

const result = await client.quiz.findFirst({
  include: {
    questions: true,
  },
});
console.log(result);

await client.$disconnect();
