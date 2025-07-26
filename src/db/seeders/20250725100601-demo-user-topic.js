"use strict";
/** @type {import('sequelize-cli').Seeders} */
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userTopicData = [];

    // Giả sử có 50 user và 50 topic
    const totalUsers = 50;
    const totalTopics = 50;

    for (let userId = 1; userId <= totalUsers; userId++) {
      const topicCount = faker.number.int({ min: 1, max: 3 });
      const topicIds = [];

      while (topicIds.length < topicCount && topicIds.length < totalTopics) {
        const topicId = faker.number.int({ min: 1, max: totalTopics });
        if (!topicIds.includes(topicId)) {
          topicIds.push(topicId);
        }
      }

      topicIds.forEach((topicId) => {
        userTopicData.push({
          user_id: userId,
          topic_id: topicId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    }

    await queryInterface.bulkInsert("user_topic", userTopicData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_topic", null, {});
  },
};
