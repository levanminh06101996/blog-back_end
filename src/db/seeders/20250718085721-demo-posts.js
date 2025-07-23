"use strict";

/** @type {import('sequelize-cli').Seeders} */
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [];

    // Tạo 50 bản ghi ngẫu nhiên
    for (let i = 0; i < 50; i++) {
      const userId = faker.number.int({ min: 1, max: 50 }); // Giả định user_id từ 1 đến 50
      const title = faker.lorem.words({ min: 2, max: 5 });
      const slug = `${title
        .toLowerCase()
        .replace(/\s+/g, "-")}-${faker.string.alphanumeric(6)}`; // Đảm bảo slug duy nhất
      const description = faker.lorem.sentence();
      const metaTitle = `${title} - Guide`;
      const metaDescription = faker.lorem.sentence();
      const thumbnail = faker.image.url();
      const cover = faker.image.url();
      const content = faker.helpers
        .multiple(faker.lorem.paragraph, {
          count: { min: 1, max: 3 },
        })
        .join("\n");
      const status = faker.helpers.arrayElement(["draft", "published"]);
      const visibility = faker.helpers.arrayElement(["public", "private"]);
      const viewsCount = faker.number.int({ min: 0, max: 500 });
      const likesCount = faker.number.int({ min: 0, max: 100 });
      const publishedAt = status === "published" ? faker.date.past() : null;

      posts.push({
        user_id: userId,
        title,
        description,
        meta_title: metaTitle,
        meta_description: metaDescription,
        slug,
        thumbnail,
        cover,
        content,
        status,
        visibility,
        views_count: viewsCount,
        likes_count: likesCount,
        published_at: publishedAt,
        // Không bao gồm created_at và updated_at để Sequelize tự động xử lý
      });
    }

    await queryInterface.bulkInsert("posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
