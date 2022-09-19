'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Mulch Fantasy',
        url:'lol',
        userId: 1,
        albumId:3,
        description:'Hamburgers! The cornerstone of any nutritious breakfast.',
        previewImage:"https://i.imgur.com/4gGq9P7.jpg"
      },
      {
        title: 'Ocean Drive',
        url:'lol',
        userId: 1,
        albumId:3,
        description:'I must be a mermaid. I have no fear of depths and a great fear of shallow living.',
        previewImage:"https://i.imgur.com/ppw5Hps.jpg"
      },
      {
        title: 'Cracks in the Sky',
        url:'song url here',
        userId: 2,
        albumId: 1,
        description:'You don\'t get to choose if you get hurt in this world...but you do have some say in who hurts you. I like my choices.',
        previewImage: "https://i.imgur.com/r1homGY.jpg"
      },
      {
        title: 'Pure Spectrum',
        url:'song url here',
        userId: 3,
        albumId:2,
        description:'So, this is my life. And I want you to know that I am both happy and sad and I\'m still trying to figure out how that could be.',
        previewImage: "https://i.imgur.com/m4ov4dg.jpg"
      },
      {
        title: 'Black Sheep',
        url:'song url here',
        userId: 1,
        albumId: 3,
        description:'Leave the gun. Take the cannoli.',
        previewImage:"https://i.imgur.com/3ysdWn1.jpg"
      },
    ], {})
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
    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Song1', 'Song2', 'Song3', 'Song4'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
