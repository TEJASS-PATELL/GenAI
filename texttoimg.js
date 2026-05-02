import { writeFileSync } from "fs";
import OpenAI from "openai";
import { configDotenv } from "dotenv";
const client = new OpenAI({apiKey: process.env.apiKey})

async function main(){
    const response = await client.images.generate({
        model: "dall-e-2",
        prompt: "generate image of a lion",
        size: "512x512",
        n: 1,
        response_format: "b64_json"
    })

    console.log(response);
    const rawImg = response.data[0].b64_json;
    const path = "./generatedImg.png"
    const buffer = Buffer.from(rawImg, 'base64');

    writeFileSync(path, buffer);
}

main();