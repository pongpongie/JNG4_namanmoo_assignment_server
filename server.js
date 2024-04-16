const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/react_assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to react_assignment database");
  })
  .catch((err) => {
    console.log("Failed to connect to database:", err);
  });

const Post = require("./models/Post");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Get a single post by id
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).send("Post not found");
    }
    res.send("Post deleted");
  } catch (err) {
    res.status(500).send(err.toString());
  }
});
