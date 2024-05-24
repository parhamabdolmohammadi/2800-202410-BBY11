// Code from Groqcloud documentation:
// https://console.groq.com/docs/quickstart

// Using AI model: llama3-70b-8192

"use strict";
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function makeAiReqAndRes(enteredAIRequestMsg, listOfServices) {

    var AIRequestMsg = enteredAIRequestMsg;

    AIRequestMsg += ". Using the following list of services: ";
    
    for (let i = 0; i < listOfServices.length; i++) {
        AIRequestMsg += listOfServices[i].name + ", ";
    }
    
    AIRequestMsg += "Please choose all applicable services from the list, and only answer " +
                    "in point form, with each point using a '/' character to seperate each point " +
                    "in the response (do no add spaces between '/' characters, and also make sure '/' is on both the start and end " +
                    " of your response message). " +
                    "If no services from the list are applicable to the request, do not follow the above instructions, " +
                    "only respond with a message (also include the words 'I'm sorry' in the message).";

    const chatCompletion = await getGroqChatCompletion(AIRequestMsg);

    // Return the chat completion returned by the LLM.
    return (chatCompletion.choices[0]?.message?.content || "");
}
async function getGroqChatCompletion(message) {
    // Pass in AI request message into messages content field
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message
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
