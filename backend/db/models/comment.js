'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey:'userId',
      })
      Comment.belongsTo(models.Song, {
        foreignKey:'songId',
      })
    }
  }
  Comment.init({
    body: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,150]
      }
    },
    songId: {
      type:DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
