module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      last_name: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        defaultValue: null,
      },
      verified_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      two_factor_enabled: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        defaultValue: null,
      },
      avatar: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      about: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      posts_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      website_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      twitter_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      github_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      verified_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  User.associate = (db) => {
    User.belongsToMany(db.User, {
      through: "follows",
      as: "following",
      foreignKey: "following_id",
      otherKey: "followed_id",
    });

    User.belongsToMany(db.User, {
      through: "follows",
      as: "followers",
      foreignKey: "followed_id",
      otherKey: "following_id",
    });
    User.hasMany(db.Post, {
      foreignKey: "user_id",
      as: "post",
    });
  };

  return User;
};
