const { RefreshToken } = require("@/models");
const generateToken = require("@/utils/generateToken");
const { REFRESH_TOKEN_EXPIRES_IN } = require("@/config/auth");
const { Op } = require("sequelize");

/**
 * Generate unique refresh token
 * @returns {string} Unique refresh token
 */
const generateUniqueToken = async () => {
  let randToken = null;
  do {
    randToken = generateToken();
  } while (
    await RefreshToken.findOne({
      where: {
        token: randToken,
      },
    })
  );
  return randToken;
};

/**
 * Create refresh token for user
 * @param {number} userId - User ID
 * @returns {Object} RefreshToken instance
 */
const createRefreshToken = async (userId) => {
  const token = await generateUniqueToken();

  const current = new Date();
  const expiredAt = new Date(
    current.getTime() + REFRESH_TOKEN_EXPIRES_IN * 1000
  );
  console.log("user:", userId);
  console.log(token);
  console.log(expiredAt);
  return await RefreshToken.create({
    user_id: userId,
    token: token,
    expired_at: expiredAt,
  });
};

/**
 * Find valid refresh token
 * @param {string} token - Refresh token string
 * @returns {Object|null} RefreshToken instance or null
 */
const findValidRefreshToken = async (token) => {
  return await RefreshToken.findOne({
    where: {
      token: token,
      expired_at: {
        [Op.gte]: Date.now(),
      },
    },
  });
};

/**
 * Delete refresh token
 * @param {Object} refreshToken - RefreshToken instance
 */
const deleteRefreshToken = async (refreshToken) => {
  await refreshToken.destroy();
};

module.exports = {
  createRefreshToken,
  findValidRefreshToken,
  deleteRefreshToken,
};
