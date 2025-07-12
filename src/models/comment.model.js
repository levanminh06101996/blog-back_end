module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "comments",
      underscored: true,
      timestamps: true,
    }
  );

  Comment.associate = (db) => {
    Comment.belongsTo(db.User, {
      as: "user",
    });
    Comment.belongsTo(db.Post, {
      as: "post",
    });
  };

  return Comment;
};
