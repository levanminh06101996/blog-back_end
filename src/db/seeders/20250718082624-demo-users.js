// /Users/leminh/Desktop/Dev/CloneF8-Day66/blog-api/src/db/seeds/[timestamp]-add-50-users-with-faker.js
"use strict";

/** @type {import('sequelize-cli').Seeders} */
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    // Tạo 50 bản ghi ngẫu nhiên
    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`; // Đảm bảo unique
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`; // Đảm bảo unique
      const password = faker.internet.password();
      const avatar = faker.image.avatar();
      const title = faker.person.jobTitle();
      const about = faker.lorem.paragraph();
      const postsCount = faker.number.int({ min: 0, max: 20 });
      const followersCount = faker.number.int({ min: 0, max: 100 });
      const followingCount = faker.number.int({ min: 0, max: 100 });
      const likesCount = faker.number.int({ min: 0, max: 50 });
      const address = faker.location.streetAddress();
      const websiteUrl = faker.internet.url();
      const twitterUrl = `https://twitter.com/${faker.internet.userName()}`;
      const githubUrl = `https://github.com/${faker.internet.userName()}`;
      const linkedinUrl = `https://linkedin.com/in/${faker.internet.userName()}`;
      const verifiedAt = faker.datatype.boolean() ? faker.date.past() : null;
      const twoFactorEnabled = faker.number.int({ min: 0, max: 1 });

      users.push({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        two_factor_enabled: twoFactorEnabled,
        two_factor_secret: null,
        username,
        avatar,
        title,
        about,
        posts_count: postsCount,
        followers_count: followersCount,
        following_count: followingCount,
        likes_count: likesCount,
        address,
        website_url: websiteUrl,
        twitter_url: twitterUrl,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        verified_at: verifiedAt,
        // Không bao gồm created_at và updated_at để Sequelize tự động xử lý
      });
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
