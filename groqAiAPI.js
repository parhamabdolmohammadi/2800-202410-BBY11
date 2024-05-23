// Code from Groqcloud documentation:
// https://console.groq.com/docs/quickstart

// Using AI model: llama3-70b-8192

"use strict";
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function makeAiReqAndRes() {
    const chatCompletion = await getGroqChatCompletion();
    // Return the chat completion returned by the LLM.
    return (chatCompletion.choices[0]?.message?.content || "");
}
async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Explain the importance of fast language models"
            }
        ],
        model: "llama3-70b-8192"
    });
}
module.exports = {
    makeAiReqAndRes,
    getGroqChatCompletion
};

// Set up API Key:
// export GROQ_API_KEY=<api-key-here>
