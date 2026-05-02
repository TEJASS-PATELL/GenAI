import OpenAI from "openai";
import { configDotenv } from "dotenv";
const client = new OpenAI({apiKey: process.env.apiKey})

const prompt = "what is coding";
const model = "gpt-4o-mini";

// const response = await client.responses.create({
//     input: "apple color is",
//     instructions: "give answer in 5 words",
//     model: "gpt-4o-mini"
// });

const response = await client.responses.create({
    input: [
        {role: "system", content: "answer in hindi"},
        {role: "user", content: "what is coding"},
    ],
    model,
    temperature:1,
    max_output_tokens: 20,
    store:true
});

const oldRes = await client.responses.retrieve("resid")
console.log(oldRes);

console.log(response);

function findtoken(){
    const encoder = encoding_for_model(model);
    const tokenData = encoder.encode(prompt);
    console.log(tokenData);
}

findtoken();