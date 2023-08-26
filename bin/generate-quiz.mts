import * as path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import OpenAI from "openai";

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
        "Write me a list of 10 multiple choice Jurassic Park quiz questions and answers. Don't make the questions easy.",
    },
  ],
});

console.log(JSON.stringify(result, null, 2));
