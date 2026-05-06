import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { configDotenv } from "dotenv"; 

configDotenv(); 

async function main() {
    if (!process.env.geminiKey) {
        console.error("Error: .env file mein 'geminiKey' nahi mili!");
        return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.geminiKey });
    const prompt = "Create a picture of a ben 10 with dark black theme";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-image-preview",
            contents: [{ role: 'user', parts: [{ text: prompt }] }], 
        });

        if (!response.candidates || response.candidates.length === 0) {
            console.log("No response from AI.");
            return;
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log("AI Message:", part.text);
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData, "base64");
                fs.writeFileSync("ben.png", buffer);
                console.log("Image saved as ben.png");
            }
        }
    } catch (error) {
        console.error("API Error:", error.message);
    }
}

main();