const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const jwtService = require("./jwt.service");
const refreshTokenService = require("./refreshToken.service");
const loadEmail = require("../utils/loadEmail");
const transporter = require("../config/mailer");
const userService = require("./user.service");
/**
 * Register new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Token data
 */
const register = async ({ email, password, first_name, last_name }) => {
  const user = await User.create({
    email,
    password: await hash(password),
    first_name,
    last_name,
  });
  // const token = jwtService.generateAccessToken(user.id);
  // const verifyUrl = `http://localhost:3000/api/verify?token=${token}`;
  // const userId = req.params.id;
  // const data = { token, userId, verifyUrl };

  // await userService.update(userId, {
  //   verified_at: new Date(),
  // });
  const tokenData = jwtService.generateAccessToken(user.id);

  const verifyUrl = `http://localhost:3000/api/verify/${user.id}?token=${tokenData.access_token}`;
  const data = { tokenData, verifyUrl };
  const template = await loadEmail("auth/verification", data);
  const info = await transporter.sendMail({
    from: '"MinhBe" <minhlvf8196@fullstack.edu.v>',
    to: "levanminh0610@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: template,
  });
  await userService.update(user.id, {
    verified_at: new Date(),
  });

  return tokenData;
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Token data with refresh token
 * @throws {Error} If credentials are invalid
 */
const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Thông tin đăng nhập không hợp lệ.");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Thông tin đăng nhập không hợp lệ.");
  }

  const tokenData = jwtService.generateAccessToken(user.id);
  const refreshToken = await refreshTokenService.createRefreshToken(user.id);

  return {
    ...tokenData,
    refresh_token: refreshToken.token,
  };
};

/**
 * Refresh access token
 * @param {string} refreshTokenString - Refresh token
 * @returns {Object} New token data with new refresh token
 * @throws {Error} If refresh token is invalid
 */
const refreshAccessToken = async (refreshTokenString) => {
  const refreshToken = await refreshTokenService.findValidRefreshToken(
    refreshTokenString
  );
  if (!refreshToken) {
    throw new Error("Refresh token không hợp lệ");
  }

  const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
  await refreshTokenService.deleteRefreshToken(refreshToken);

  const newRefreshToken = await refreshTokenService.createRefreshToken(
    refreshToken.user_id
  );

  return {
    ...tokenData,
    refresh_token: newRefreshToken.token,
  };
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};
