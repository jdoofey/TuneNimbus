'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [
      {
        title:'Fire',
        description:'Hot hot hot',
        userId:1
      },
      {
        title:'Water',
        description:'Hydrate or diedrate',
        userId:2
      },
      {
        title:'Earth',
        description:'This place is getting crowded',
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Albums', {
       title: { [Op.in]: ['Fire', 'Water', 'Earth'] }
     }, {});
  }
};
