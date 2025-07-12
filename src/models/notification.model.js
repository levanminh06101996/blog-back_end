module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    notifiable_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    notifiable_id: {
      type: DataTypes.INTEGER({
        unsigned: true,
      }),
      allowNull: false,
    },
  });
  Comment.associate = (db) => {
    Comment.belongsTo(db.Post);
  };
  return Comment;
};
