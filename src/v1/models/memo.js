const mongoose = require("mongoose");
const category = require("./category");
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
    onDelete: "cascade",
  },
  title: {
    type: String,
    default: "無題のメモ",
  },
  content: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Memo", memoSchema);
