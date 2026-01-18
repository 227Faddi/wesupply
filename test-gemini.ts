import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("Testing with gemini-2.5-flash...");
    const result = await model.generateContent("Hello, respond with 'Gemini 2.5 Flash is active'.");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error with gemini-2.5-flash:", error);
  }
}

main();
