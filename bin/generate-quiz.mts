import * as path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

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
      content:
        "Write me a list of 10 multiple choice Back to the Future quiz questions and answers. Don't make the questions easy.",
    },
  ],
});

await writeFile(
  "./data/responses/back-to-the-future.json",
  JSON.stringify(result, null, 2),
);
