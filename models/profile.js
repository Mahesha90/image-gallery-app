module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Profile;
};
