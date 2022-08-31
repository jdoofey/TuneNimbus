'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Song, {
        foreignKey:'albumId',
        onDelete:'CASCADE',
        hooks:true
      })
      Album.belongsTo(models.User, {
        foreignKey:'userId',
        as:'Artist',
        onDelete:'CASCADE'
      })
    }
  }
  Album.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.STRING,
    previewImage: DataTypes.STRING,
    userId: {
      type:DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
