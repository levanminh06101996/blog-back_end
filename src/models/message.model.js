module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      type: {
        type: Sequelize.STRING(50),
        defaultValue: "text",
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "messages",
      underscored: true,
      timestamps: true,
    }
  );
  Messages.associate = (db) => {
    Messages.belongsTo(db.User, {
      as: "user",
    });
    Messages.belongsTo(db.Conversation, {
      as: "conversation",
    });
  };

  return Comment;
};
