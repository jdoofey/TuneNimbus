'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, {foreignKey:'userId'})
      Playlist.belongsToMany(models.Song,
        {through:models.PlaylistSong},
        {foreignKey:'playlistId',
        onDelete:'CASCADE'
      })
    }
  }
  Playlist.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
