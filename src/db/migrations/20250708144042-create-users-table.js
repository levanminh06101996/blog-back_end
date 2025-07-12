"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      last_name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      two_factor_enabled: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      about: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      posts_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      followers_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      website_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      twitter_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      github_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      linkedin_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
