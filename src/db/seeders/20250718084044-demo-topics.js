"use strict";

/** @type {import('sequelize-cli').Seeders} */
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [];

    // Tạo 50 bản ghi ngẫu nhiên
    for (let i = 0; i < 50; i++) {
      const name = faker.lorem.words({ min: 1, max: 3 });
      const slug = `${name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${faker.string.alphanumeric(6)}`; // Đảm bảo slug duy nhất
      const image = faker.image.url();
      const description = faker.lorem.paragraph();
      const postsCount = faker.number.int({ min: 0, max: 100 });

      topics.push({
        name,
        slug,
        image,
        description,
        posts_count: postsCount,
        // Không bao gồm created_at và updated_at để Sequelize tự động xử lý
      });
    }

    await queryInterface.bulkInsert("topics", topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
