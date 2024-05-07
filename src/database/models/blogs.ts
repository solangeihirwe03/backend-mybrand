import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    public_id: "string",
    url: "string",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("blogs", blogSchema);
export default BlogModel