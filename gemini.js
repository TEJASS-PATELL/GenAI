import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
configDotenv();

const ai = new GoogleGenAI({apiKey: process.env.geminiKey});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Explain how AI works in a few words",
    config:{
        temperature: 0.5,
        thinkingConfig: {
            includeThoughts: true,
            thinkingBudget:100
        },
        systemInstruction:"answer upto 20 words"
    },

  });
  console.log(response.text);
}

main();