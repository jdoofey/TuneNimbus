'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        body:'This is a great song',
        songId:3,
        userId:1
      },
      {
        body:'This song is okay',
        songId:1,
        userId:2
      },
      {
        body:'This song made my ears cry',
        songId:2,
        userId:3
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      body: { [Op.in]: ['This is a great song', 'This song is okay', 'This song made my ears cry'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
