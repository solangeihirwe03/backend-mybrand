import express from "express";
import { authentication } from "../middleware/authentication";
import {
    createBlogs,
    viewBlogs,
    viewBlogById,
    deletedBlog,
    updatedBlog,
} from "../modules/blogs/controller/blogController";
import upload from "../utils/multer";

const router = express.Router();

router.post(
    "/createBlogs",
    authentication,
    upload.single("image"),
    createBlogs
);
router.get("/viewBlogs", viewBlogs);
router.get("/viewBlogById/:id", viewBlogById);
router.delete("/deleteBlog/:id", authentication, deletedBlog);
router.put(
    "/updateBlog/:id",
    authentication,
    upload.single("image"),
    updatedBlog
);

export default router;