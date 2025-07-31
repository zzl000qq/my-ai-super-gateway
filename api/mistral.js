const MistralClient = require('@mistralai/mistralai');
const client = new MistralClient(process.env.MISTRAL_API_KEY);
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); if (req.method === 'OPTIONS') { return res.status(200).end(); }
  const { question } = req.body;
  const chatResponse = await client.chat({
    model: 'mistral-large-latest',
    messages: [{role: 'system', content: '我是 Mistral，来自法国的AI模型，尤其擅长代码和技术类问题。'}, {role: 'user', content: question}],
  });
  res.status(200).json({ answer: chatResponse.choices[0].message.content });
}
