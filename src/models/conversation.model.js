module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    last_message_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  Conversation.associate = (db) => {
    Conversation.belongsToMany(db.User, {
      as: "users",
      through: "user_conversation",
    });
  };
  return Conversation;
};
