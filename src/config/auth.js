module.exports = {
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "835fb85dbd6a6e937479de267dccc88dc31c3b80757301a109d9d3b79427b783",
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN) || "24h", // seconds
  REFRESH_TOKEN_EXPIRES_IN:
    parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 30 * 48 * 60 * 60, // 30 days = 2,592,000 seconds
  RESET_TOKEN_EXPIRES_IN: "1h",
  TOKEN_TYPE: process.env.TOKEN_TYPE || "Bearer",
};
