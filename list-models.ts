import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function main() {
  try {
    // There is no direct listModels on genAI in the new SDK sometimes, 
    // but we can try to find how to do it or just try common names.
    console.log("Checking common names...");
    const models = ["gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("test");
            console.log(`Success with ${m}`);
            return;
        } catch (e) {
            console.log(`Failed with ${m}: ${e.message}`);
        }
    }
  } catch (error) {
    console.error(error);
  }
}

main();
