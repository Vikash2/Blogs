const express = require("express");

const postController = require("../controllers/post");
const checkAuth = require("../middleware/check-auth");
const extractedImage = require("../middleware/image-storage");
const router = express.Router();

router.post("", checkAuth, extractedImage, postController.createPost);

router.put("/:id", checkAuth, extractedImage, postController.updatePost);

router.get("", postController.getPosts);

router.get("/:id", postController.getPostById);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
