import express from "express";
import mongoose from "mongoose";
import { shortUrl,gerOriginalUrl } from "./controlers/url.js"; // adjust if default export

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", "./views");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/urlshortner")
  .then(() => {
    console.log("✅ MongoDB connected");
    const port = 1000;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

app.post("/short", shortUrl);

// redirecting a
app.get("/:shortcode",gerOriginalUrl);