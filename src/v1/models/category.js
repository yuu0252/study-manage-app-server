const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "未分類",
  },
});

module.exports = mongoose.model("Category", categorySchema);
