const express = require("express");
const { blog, cmntPost, cmntDel, blogWrite, blogWritePost, blogDel, editBlog, updateBlog } = require("../controllers/blog.controller");
const router = express.Router();

router.get("/blogs/:id", blog);
router.post("/cmntPost/:blog_id", cmntPost);
router.post("/blogPost", cmntPost);
router.get("/blogWrite", blogWrite);
router.get("/blogDel/:bloggerId/:blogId", blogDel);
router.post("/blogWrite", blogWritePost);
router.get("/cmntDel/:cmnt_id/:user_id", cmntDel);
router.get("/editBlog/:blog_id", editBlog);
router.post("/blogUpdate/:blog_id", updateBlog);

module.exports = router;