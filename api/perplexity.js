const { Perplexity } = require('@perplexity/pplx-sdk');
const client = new Perplexity({ apiKey: process.env.PERPLEXITY_API_KEY });
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); if (req.method === 'OPTIONS') { return res.status(200).end(); }
  const { question } = req.body;
  const response = await client.chat.completions.create({
    model: 'llama-3-sonar-large-32k-online',
    messages: [{ role: 'system', content: '我是 Perplexity，一个具备实时联网搜索能力的AI。我的回答都会附带信息来源，确保准确性。' }, { role: 'user', content: question }],
  });
  res.status(200).json({ answer: response.choices[0].message.content });
}
