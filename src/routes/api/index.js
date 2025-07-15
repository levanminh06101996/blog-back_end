const express = require("express");
const router = express.Router({ mergeParams: true });

const authRouter = require("./auth.route");
const commentRouter = require("./comment.route");
const postRouter = require("./post.route");
const topicRouter = require("./topic.route");
const userRouter = require("./user.route");

router.use("/auth", authRouter);
router.use("/topics", topicRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/posts/:slug/comments", commentRouter);

module.exports = router;
