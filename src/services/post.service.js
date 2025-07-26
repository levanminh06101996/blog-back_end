const { Post, Topic, Comment, User } = require("@/models/index");
const { nanoid } = require("nanoid");
const { where, Op } = require("sequelize");
const { default: slugify } = require("slugify");

class PostsService {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;

    const { rows: items, count: total } = await Post.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: "user",
    });

    return { items, total };
  }

  async getByKey(key) {
    const isId = /^\d+$/.test(key);
    const post = await Post.findOne({
      where: isId ? { id: key } : { slug: key },
      include: [Topic, Comment, User],
    });
    return post;
  }

  async getBySlug(slug) {
    const post = await Post.findOne({ where: { slug }, include: "user" });
    return post;
  }

  async create(data) {
    console.log("data ", data);
    const toSlug = (title) => {
      return `${slugify(title, { lower: true, strict: true })}-${nanoid(6)}`;
    };
    data.slug = toSlug(data.title);

    const topic = await Topic.findByPk(data.topic_id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const createdPost = await Post.create(data, { returning: true });
    await topic.addPost(createdPost.id);
    return {
      message: "Posts created and linked to topic successfully",
      data: createdPost,
    };
  }

  async update(key, data) {
    const toSlug = (title) => {
      return `${slugify(title, { lower: true, strict: true })}-${nanoid(6)}`;
    };
    data.slug = toSlug(data.title);
    const isId = /^\d+$/.test(key);
    const post = await Post.update(data, {
      where: isId ? { id: key } : { slug: key },
    });
    return post;
  }

  async remove(key) {
    const isId = /^\d+$/.test(key);
    const post = await Post.destroy({
      where: isId ? { id: key } : { slug: key },
    });
    return post;
  }
}

module.exports = new PostsService();
