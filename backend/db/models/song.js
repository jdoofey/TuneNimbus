'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.Comment, {foreignKey:'songId'})
      Song.belongsTo(models.User, {as:'Artist',foreignKey:'userId'})
      Song.belongsTo(models.Album, {foreignKey:'albumId'})
      Song.belongsToMany(models.Playlist,
        {through:models.PlaylistSong},
        {foreignKey:'songId',
        otherKey:'playlistId',
        onDelete:'CASCADE'
      }
        )
    }
  }
  Song.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.STRING,
    url: {
      type:DataTypes.STRING,
      allowNull:false
    },
    previewImage: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
