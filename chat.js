import OpenAI from "openai"
import { configDotenv } from "dotenv";
const client = new OpenAI({apiKey: process.env.apiKey})

const history = [
    {
        role: 'system',
        content: 'keep your answer short and simple'
    }
]

async function chatbot(ques){
    history.push({role:"user", content: ques})
    const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: history
    })

    history.push({role: "assistant", content: response.output_text});   
    console.log(response.output_text);
}

// chatbot();

process.stdout.write("Ask your question");
process.stdin.on("data", (data) => {
    const ques = data.toString().trim();
    chatbot(ques)
})

