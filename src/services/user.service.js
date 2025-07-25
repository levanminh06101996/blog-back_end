const { User, Post } = require("../models/index");
const { where, op, row, count } = require("sequelize");

class UsersService {
  async getAll() {
    const items = await User.findAll({ include: "post" });
    console.log(items);
    return items;
  }

  async getById(id) {
    const user = await User.findOne({ where: { id }, include: "post" });
    return user;
  }
  async getByUsername(username) {
    const user = await User.findOne({ where: { username }, include: "post" });
    return user;
  }

  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async update(id, data) {
    const user = await User.update(data, {
      where: { id },
    });
    return user;
  }

  async remove(id) {
    const user = await User.destroy({ where: { id } });
    return user;
  }
}

module.exports = new UsersService();
