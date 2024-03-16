require("dotenv").config();

exports.getData = async (req, res) => {
  const { prompt } = req.body;

  const SECRET_KEY = process.env.OPENAI_SECRET_KEY;

  res.status(200).json(SECRET_KEY);
};
