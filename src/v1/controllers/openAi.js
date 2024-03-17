require("dotenv").config();
const OpenAI = require("openai");

const SECRET_KEY = process.env.OPENAI_SECRET_KEY;
const openai = new OpenAI({ apiKey: SECRET_KEY });

exports.chat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt == "")
      return res.status(400).json("プロンプトが不正です");

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.status(200).json(completion.choices[0].message.content);
  } catch (err) {
    res.status(500).json(err);
  }
};
