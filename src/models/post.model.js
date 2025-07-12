module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      meta_title: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      meta_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      cover: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      content: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "draft",
      },
      visibility: {
        type: DataTypes.STRING(50),
        defaultValue: "public",
      },
      views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "posts",
      timestamps: true,
      underscored: true,
    }
  );
  // Post.associate = (db) => {
  //   Post.hasMany(db.Comment);
  //   Post.belongsTo(db.Topic);
  // };

  Post.associate = (db) => {
    post,
  };
  return Post;
};
