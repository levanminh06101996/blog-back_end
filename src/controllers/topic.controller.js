const topicsService = require("@/services/topic.service");

const response = require("@/utils/response");
const throwError = require("@/utils/throwError");

const index = async (req, res) => {
  const { page, limit } = req;
  const { items, total } = await topicsService.getAll(page, limit);
  res.paginate({ items, total });
};

const indexTopicsTrending = async (req, res) => {
  const { limit } = req;
  const { items, total } = await topicsService.getTopicsCount(limit);
  res.paginate({ items, total });
};

const indexFeaturedArticles = async (req, res) => {
  const { limit } = req.query;
  const featuredArticles = await topicsService.getFeaturedArticles(limit);

  const filteredArticles = featuredArticles.map((article) => {
    if (article && article.topics && article.topics.length > 0) {
      const randomTopic =
        article.topics[Math.floor(Math.random() * article.topics.length)];
      return {
        ...article.toJSON(),
        topics: [randomTopic],
      };
    }
    return article;
  });
  response.success(res, 201, filteredArticles);
};

const indexGetLatestPost = async (req, res) => {
  const { limit } = req.query;
  const latestPosts = await topicsService.getLatestPosts(limit);

  const filterLatestPosts = latestPosts.map((post) => {
    if (post && post.topics && post.topics.length > 0) {
      const randomTopic =
        post.topics[Math.floor(Math.random() * post.topics.length)];
      return {
        ...post.toJSON(),
        topics: [randomTopic],
      };
    }
    return post;
  });
  response.success(res, 201, filterLatestPosts);
};

const show = async (req, res) => {
  const topic_name = req.params.topic_name;
  const topic = await topicsService.getById(topic_name);

  if (!topic) throwError(404, "Not Found.");

  response.success(res, 200, topic);
};

const store = async (req, res) => {
  const topic = await topicsService.create(req.body);
  response.success(res, 201, topic);
};

const update = async (req, res) => {
  const topic = await topicsService.update(req.params.topic_name, req.body);

  if (!topic) throwError(404, "Not Found.");

  response.success(res, 201, topic);
};

const destroy = async (req, res) => {
  const result = await topicsService.remove(req.params.topic_name);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = {
  show,
  index,
  store,
  update,
  destroy,
  indexTopicsTrending,
  indexFeaturedArticles,
  indexGetLatestPost,
};
