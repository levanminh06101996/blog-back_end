const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const jwtService = require("./jwt.service");
const refreshTokenService = require("./refreshToken.service");
const loadEmail = require("../utils/loadEmail");
const transporter = require("../config/mailer");
const userService = require("./user.service");
const { RESET_TOKEN_EXPIRES_IN } = require("../config/auth");
const { Post } = require("../models/index");
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

  const tokenData = jwtService.generateAccessToken(user.id);
  const verifyUrl = `http://localhost:5173/verify?userId=${user.id}&token=${tokenData.access_token}`;
  const data = { tokenData, verifyUrl };
  const template = await loadEmail("auth/verification", data);
  const info = await transporter.sendMail({
    from: '"MinhBe" <minhlvf8196@fullstack.edu.vn>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: template,
  });
  return tokenData;
};

const verifyAccount = async (userId, token) => {
  try {
    const decoded = jwtService.verifyAccessToken(token);
    if (decoded.userId !== Number(userId)) {
      throw new Error("Token không hợp lệ");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    if (user.verified_at) {
      return { message: "Tài khoản đã được xác thực trước đó" };
    }

    await user.update({ verified_at: new Date() });
    return { message: "Tài khoản đã được xác thực thành công" };
  } catch (error) {
    throw new Error("Xác thực thất bại: " + error.message);
  }
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

const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email không tồn tại");
  const resetToken = jwtService.generateAccessToken(
    user.id,
    RESET_TOKEN_EXPIRES_IN
  );
  console.log("Generated reset token:", resetToken.access_token);
  await user.update({
    reset_token: resetToken.access_token,
    reset_token_expires: new Date(
      Date.now() + parseInt(RESET_TOKEN_EXPIRES_IN)
    ),
  });

  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken.access_token}`;
  const data = { resetUrl, email };
  const template = await loadEmail("auth/forgot-password", data);
  console.log("Loaded email template for:", email);

  try {
    await transporter.sendMail({
      from: `"MinhBe" <minhlvf8196@fullstack.edu.vn>`,
      to: email,
      subject: "Đặt lại mật khẩu ✔",
      html: template,
    });
    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Gửi email thất bại: " + error.message);
  }
};
//   await transporter.sendMail({
//     from: '"MinhBe" <minhlvf8196@fullstack.edu.vn>',
//     to: email,
//     subject: "Đặt lại mật khẩu ✔",
//     html: template,
//   });
//   console.log("Email sent to:", email);
//   return { message: "Email đặt lại mật khẩu đã được gửi" };
// };

const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwtService.verifyAccessToken(token);
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        // reset_token: token,
        // reset_token_expires: { [Op.gt]: new Date() },
      },
    });
    console.log("user: ", user);
    if (!user)
      throw new Error("Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");

    await user.update({
      password: await hash(newPassword),
      reset_token: null,
      reset_token_expires: null,
    });
    return { message: "Mật khẩu đã được đặt lại thành công" };
  } catch (error) {
    throw new Error("Đặt lại mật khẩu thất bại: " + error.message);
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  verifyAccount,
  forgotPassword,
  resetPassword,
};
