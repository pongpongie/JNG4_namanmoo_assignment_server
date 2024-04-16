const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentNumber: Number,
    userId: mongoose.Schema.Types.Mixed, // Mixed type because userId can be either String or Number
    body: String,
  },
  { _id: false }
); // Disable _id for subdocuments if not needed

const postSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    body: String,
    url: String,
    comments: [commentSchema],
  },
  { collection: "posts" }
); // Use the existing collection

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
