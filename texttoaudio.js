import { createReadStream, writeFileSync } from "fs";
import OpenAI from "openai";
import { configDotenv } from "dotenv";
const client = new OpenAI({apiKey: process.env.apiKey})

async function main(){
    const textresponse = await client.audio.transcriptions.create({
        model: "whisper-1",
        file: createReadStream('speech-94649.mp3'),
        language: 'en'
    })

    console.log(textresponse.text);
}

main();