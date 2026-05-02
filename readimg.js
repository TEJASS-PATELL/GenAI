import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
import { readFileSync } from "fs";
configDotenv();

const ai = new GoogleGenAI({ apiKey: process.env.geminiKey });

async function main() {
    try {
        const imageData = readFileSync("SPIDERMAN.jpg", {
            encoding: "base64"
        });

        // generateContentStream ki jagah generateContent use karein simple result ke liye
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // gemini-3 abhi preview/stable nahi hai sabke liye
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: imageData
                            },
                        },
                        { text: 'Which superhero is present in this image?' }
                    ]
                }
            ],
        });

        // Ab 'response' variable use karein jo upar define kiya hai
        console.log(response.candidates[0].content.parts[0].text);

    } catch (error) {
        console.error("Kucch gadbad hai:", error.message);
    }
}

main();