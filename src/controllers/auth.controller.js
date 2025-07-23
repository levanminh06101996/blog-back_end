const response = require("@/utils/response");
const authService = require("@/services/auth.service");

const register = async (req, res) => {
  try {
    const { email, password, last_name, first_name } = req.body;
    const tokenData = await authService.register({
      email,
      password,
      last_name,
      first_name,
      verified_at: null,
    });
    response.success(res, 200, tokenData);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

const login = async (req, res) => {
  try {
    const tokenData = await authService.login(
      req.body.email,
      req.body.password
    );
    response.success(res, 200, tokenData);
  } catch (error) {
    response.success(res, 401, error.message);
  }
};

const me = async (req, res) => {
  response.success(res, 200, req.user);
};

const refreshToken = async (req, res) => {
  try {
    const tokenData = await authService.refreshAccessToken(
      req.body.refresh_token
    );
    response.success(res, 200, tokenData);
  } catch (error) {
    response.error(res, 403, error.message);
  }
};

/**
 * Xác thực tài khoản
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const verify = async (req, res) => {
  try {
    const { userId, token } = req.query;
    const result = await authService.verifyAccount(userId, token);
    response.success(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    console.log("ket qua tra ve", result);
    response.success(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    response.success(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

module.exports = {
  register,
  login,
  me,
  refreshToken,
  verify,
  forgotPassword,
  resetPassword,
};
