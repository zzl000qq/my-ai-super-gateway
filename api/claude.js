const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); if (req.method === 'OPTIONS') { return res.status(200).end(); }
  const { question } = req.body;
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229", max_tokens: 4096,
    system: "我是 Claude，一个由 Anthropic 创造的AI助手。我擅长处理长文本、进行严谨的逻辑分析，并提供富有深度的见解。",
    messages: [{ role: "user", content: question }],
  });
  res.status(200).json({ answer: msg.content[0].text });
}
