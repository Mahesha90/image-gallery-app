module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    filename: DataTypes.STRING,
    visibility: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  
  Image.associate = function(models) {
    Image.belongsTo(models.User, { foreignKey: 'user_id' });
    Image.hasMany(models.Rating, { foreignKey: 'image_id' });
  };

  return Image;
};
