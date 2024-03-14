const Category = require("../models/category");
const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { title, content } = req.body;
    const userId = req.user._id;

    if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      return res.status(400).json("カテゴリIDが無効です");
    }

    const category = await Category.findOne({
      user: userId,
      _id: categoryId,
    });

    if (!category) return res.status(404).json("カテゴリが存在しません");

    const memo = await Memo.create({
      user: userId,
      category: categoryId,
      title: title,
      content: content,
    });

    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user._id;

    if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      return res.status(400).json("カテゴリIDが無効です");
    }

    const category = await Category.findOne({
      user: userId,
      _id: categoryId,
    });

    if (!category) return res.status(404).json("カテゴリが存在しません");

    const memo = await Memo.find({ user: userId, category: categoryId });

    res.status(200).json(memo);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
