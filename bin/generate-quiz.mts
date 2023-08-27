import * as path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

const SUBJECT = "Harry Potter";

const projectDirectory = path.resolve(fileURLToPath(import.meta.url), "../../");
nextEnv.loadEnvConfig(projectDirectory);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

const result = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: `Write me a list of 10 multiple choice ${SUBJECT} quiz questions and answers. Don't make the questions easy. Use the following format for each question:\n\n1. In the movie Back to the Future, what is the name of Doc Brown's dog?\n\na) Einstein\nb) Newton\nc) Tesla\nd) Baxter\n\nAnswer: a) Einstein`,
    },
  ],
});

await writeFile(
  "./data/responses/sample.json",
  JSON.stringify(result, null, 2),
);
