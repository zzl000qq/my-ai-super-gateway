import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); if (req.method === 'OPTIONS') { return res.status(200).end(); }
  const { question } = req.body;
  const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: "我是 Llama 3，开源社区的骄傲。我的回答速度极快，几乎没有延迟。" }, { role: "user", content: question }],
      model: "llama3-70b-8192",
  });
  res.status(200).json({ answer: chatCompletion.choices[0]?.message?.content || "" });
}
