"use strict";
/** @type {import('sequelize-cli').Seeders} */
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const postTopicData = [];

    // Tạo 50 bản ghi liên kết ngẫu nhiên giữa posts và topics
    for (let i = 1; i <= 50; i++) {
      // Mỗi post liên kết với 1-3 topic ngẫu nhiên
      const topicCount = faker.number.int({ min: 1, max: 3 });
      const topicIds = [];
      while (topicIds.length < topicCount && topicIds.length < 50) {
        const topicId = faker.number.int({ min: 1, max: 50 });
        if (!topicIds.includes(topicId)) topicIds.push(topicId);
      }
      topicIds.forEach((topicId) => {
        postTopicData.push({
          post_id: i,
          topic_id: topicId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    }

    await queryInterface.bulkInsert("post_topic", postTopicData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("post_topic", null, {});
  },
};
