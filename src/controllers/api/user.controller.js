const transporter = require("../../config/mailer");
const usersService = require("../../services/user.service");
const response = require("../../utils/response");
const throwError = require("../../utils/throwError");
const loadEmail = require("../../utils/loadEmail");
const userService = require("../../services/user.service");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getList = async (req, res) => {
  //   // const userId = 3;
  //   // const token = jwt.sign({ userId }, process.env.TOKEN, { expiresIn: "1d" });
  //   // const verifyUrl = `http://localhost:3000/api/${userId}/verify?token=${token}`;
  //   // await userService.update(userId, {
  //   //   verified_at: new Date(),
  //   // });
  //   // const data = { token, userId, verifyUrl };
  //   // const template = await loadEmail("auth/verification", data);
  //   // const info = await transporter.sendMail({
  //   //   from: '"MinhBe" <minhlvf8196@fullstack.edu.v>',
  //   //   to: "levanminh06101996@gmail.com",
  //   //   subject: "Hello ✔",
  //   //   text: "Hello world?",
  //   //   html: template,
  //   // });
};

const index = async (req, res) => {
  const users = await usersService.getAll();
  response.success(res, 200, users);
};

const show = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (!user) throwError(404, "not Found");
  response.success(res, 201, user);
};
const showUsername = async (req, res) => {
  const user = await usersService.getByUsername(req.params.username);
  if (!user) throwError(404, "not Found");
  response.success(res, 201, user);
};

const create = async (req, res) => {
  const user = await usersService.create(req.body);
  response.success(res, 201, user);
};

const update = async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  response.success(res, 200, user);
};

const destroy = async (req, res) => {
  const user = await usersService.remove(req.params.id);
  if (!user) throwError(404, "not Found.");
  response.success(res, 204);
};

module.exports = {
  getList,
  index,
  show,
  create,
  update,
  destroy,
  showUsername,
};
