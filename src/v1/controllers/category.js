const Category = require("../models/category");

exports.create = async (req, res) => {
  try {
    let { title } = req.body;

    if (title === "" || !title) {
      title = "カテゴリなし";
    }

    const isExist = await Category.findOne({
      user: req.user._id,
      title: title,
    });

    if (isExist) {
      return res.status(409).json(`「${title}」は既に存在しています`);
    }

    const category = await Category.create({
      user: req.user._id,
      title: title,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({
      user: req.user._id,
      _id: categoryId,
    });

    if (!category) return res.status(404).json("カテゴリが見つかりません");

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { categoryId } = req.params;
    let { title } = req.body;
    if (title == "" || !title) {
      title = "カテゴリなし";
    }
    const category = await Category.findOne({
      user: req.user._id,
      _id: categoryId,
    });

    if (!category) return res.status(404).json("カテゴリが見つかりません");

    const isExist = await Category.findOne({
      user: req.user._id,
      title: title,
    });

    if (isExist) return res.status(409).json(`${title}はすでに存在しています`);

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      $set: {
        title: title,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({
      user: req.user._id,
      _id: categoryId,
    });

    if (!category) return res.status(404).json("カテゴリが見つかりません");

    await Category.deleteOne({
      user: req.user._id,
      _id: categoryId,
    });

    res.status(200).json(`${category.title}を削除しました`);
  } catch (err) {
    res.status(500).json(err);
  }
};
