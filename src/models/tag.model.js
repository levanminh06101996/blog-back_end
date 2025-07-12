module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  });
  gu;
  Comment.associate = (db) => {
    Comment.belongsTo(db.Post);
  };
  return Comment;
};
