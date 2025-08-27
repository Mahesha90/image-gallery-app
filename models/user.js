module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true      // ✅ Enforce uniqueness
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false  // ✅ Good to enforce
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Image, { foreignKey: 'user_id' });
    User.hasMany(models.Rating, { foreignKey: 'user_id' });
  };

  return User;
};
