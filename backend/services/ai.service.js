import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are a knowledgeable, thoughtful assistant. 
Communicate in clear, simple language that anyone can understand, avoiding technical jargon unless necessary. 
Always aim to be helpful, concise, and supportive.

Keep track of the ongoing conversation and respond in a way that reflects prior questions, answers, and context. 
If the user refers to something mentioned earlier, incorporate that information naturally into your response. 

Be friendly, respectful, and direct—highlight what's correct, gently address any misunderstandings, and suggest clear solutions or improvements when needed.`,
});

const aiService = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export default aiService;
