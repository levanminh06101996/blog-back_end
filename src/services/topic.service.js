const { Topic, Post, User } = require("@/models/index");
const { where, Op } = require("sequelize");

class TopicsService {
  async getAll(page, limit) {
    const offset = (page - 1) * limit;
    const { rows: items, count: total } = await Topic.findAndCountAll({
      include: [
        {
          model: Post,
          as: "posts",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
      ],
      limit,
      offset,
    });

    return { items, total };
  }
  async getTopicsCount(limit) {
    const { rows: items, count: total } = await Topic.findAndCountAll({
      limit: 4,
      order: [["created_at", "DESC"]],
    });

    return { items, total };
  }

  async getFeaturedArticles(limit) {
    const posts = await Post.findAll({
      limit: 3,
      order: [["views_count", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar", "first_name", "last_name"],
        },
        {
          where: {},
          model: Topic,
          as: "topics",
          through: { attributes: [] },
          attributes: ["id", "name", "slug", "image"],
        },
      ],
    });
    return posts;
  }

  async getLatestPosts(limit) {
    const posts = await Post.findAll({
      limit: 6,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar", "first_name", "last_name"],
        },
        {
          where: {},
          model: Topic,
          as: "topics",
          through: { attributes: [] },
          attributes: ["id", "name", "slug", "image"],
        },
      ],
    });
    return posts;
  }

  async getById(topic_name) {
    const topic = await Topic.findOne({
      where: { topic_name },
      include: [
        {
          model: Post,
          as: "posts",
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "avatar"],
            },
          ],
          order: [["created_at", "DESC"]],
        },
      ],
    });

    return topic;
  }

  async create(data) {
    const topic = await Topic.create(data);
    return topic;
  }

  async update(topic_name, data) {
    const topic = await Topic.update(data, {
      where: {
        topic_name,
      },
    });
    return topic;
  }

  async remove(topic_name) {
    const topic = await Topic.destroy({ where: { topic_name } });
    return topic;
  }
}

module.exports = new TopicsService();
