'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull:false,
        unique:true
      },
      firstName: {
        type: Sequelize.STRING(30),
      },
      lastName: {
        type: Sequelize.STRING(30),
      },
      totalSongs: {
        type:Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      previewImg: {
        type:Sequelize.STRING(256),
        //might want to define default value for preview image
      },
      totalAlbums: {
        type:Sequelize.INTEGER,
        defaultValue: 0,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull:false,
        unique:true
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
