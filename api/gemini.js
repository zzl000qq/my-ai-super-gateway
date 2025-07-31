// filepath: api/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); if (req.method === 'OPTIONS') { return res.status(200).end(); }
  const { question } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", systemInstruction: "我是 Gemini，一个由 Google 训练的全能AI模型。我将为你提供精准、富有创造力的回答。" });
  const result = await model.generateContent(question);
  res.status(200).json({ answer: result.response.text() });
}
