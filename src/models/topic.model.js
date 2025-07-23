module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      posts_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "topics",
      timestamps: true,
      underscored: true,
    }
  );
  Topic.associate = (db) => {
    Topic.belongsToMany(db.Post, {
      as: "posts",
      through: "post_topic",
      foreignKey: "topic_id",
      otherKey: "post_id",
    });
  };
  return Topic;
};
