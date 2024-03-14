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

exports.getOne = async (req, res) => {
  try {
    const { categoryId, memoId } = req.params;
    const userId = req.user._id;

    if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      return res.status(400).json("カテゴリIDが無効です");
    }

    if (!/^[0-9a-fA-F]{24}$/.test(memoId)) {
      return res.status(400).json("メモIDが無効です");
    }

    const memo = await Memo.find({
      user: userId,
      category: categoryId,
      _id: memoId,
    });

    if (!memo) return res.status(404).json("メモが見つかりません");

    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { categoryId, memoId } = req.params;
    const userId = req.user._id;

    let { title, content } = req.body;

    if (!title || title == "") title = "無題のメモ";

    if (!content) content = "";

    if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      return res.status(400).json("カテゴリIDが無効です");
    }

    if (!/^[0-9a-fA-F]{24}$/.test(memoId)) {
      return res.status(400).json("メモIDが無効です");
    }

    const memo = await Memo.findOne({
      user: userId,
      category: categoryId,
      _id: memoId,
    });

    if (!memo) return res.status(400).json("メモが見つかりません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: {
        title: title,
        content: content,
      },
    });

    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { categoryId, memoId } = req.params;
    const userId = req.user._id;

    if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      return res.status(400).json("カテゴリIDが無効です");
    }

    if (!/^[0-9a-fA-F]{24}$/.test(memoId)) {
      return res.status(400).json("メモIDが無効です");
    }

    const memo = await Memo.findOne({
      user: userId,
      category: categoryId,
      _id: memoId,
    });

    if (!memo) return res.status(404).json("メモが見つかりません");

    await Memo.findByIdAndDelete(memoId);

    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserMemos = async (req, res) => {
  try {
    const userId = req.user._id;

    const memos = await Memo.find({
      user: userId,
    });

    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};
