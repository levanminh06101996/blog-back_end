"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      return await bcrypt.hash(password, saltRounds);
    };

    module.exports = {
      async up(queryInterface, Sequelize) {
        const hashedPassword1 = await hashPassword("hashedpassword123");
        const hashedPassword2 = await hashPassword("hashedpassword456");

        await queryInterface.bulkInsert(
          "users",
          [
            {
              email: "admin@example.com",
              password: hashedPassword1,
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              email: "user1@example.com",
              password: hashedPassword2,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          {}
        );
      },
    };
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
