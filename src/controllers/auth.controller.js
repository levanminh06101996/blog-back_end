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

module.exports = { register, login, me, refreshToken };
