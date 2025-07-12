module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {});
  Comment.associate = (db) => {
    Comment.belongsTo(db.Post);
  };
  return Comment;
};
