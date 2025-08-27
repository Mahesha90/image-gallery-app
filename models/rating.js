module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['image_id', 'user_id']
      }
    ]
  });
  
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, { foreignKey: 'user_id' });
    Rating.belongsTo(models.Image, { foreignKey: 'image_id' });
  };

  return Rating;
};
