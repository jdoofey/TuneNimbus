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
      },
      {
        body:'Cannot wait until you release another one!',
        songId:1,
        userId:3
      },
      {
        body:'It was fun getting to collab with you',
        songId:1,
        userId:2
      },
      {
        body:'The best thing since sliced bread',
        songId:2,
        userId:2
      },
      {
        body:'This stuff is fire!',
        songId:2,
        userId:3
      },
      {
        body:'Bruh this is my life\'s theme song',
        songId:2,
        userId:4
      },
      {
        body:'You just gained another fan',
        songId:2,
        userId:5
      },
      {
        body:'Nodding my head nonstop',
        songId:1,
        userId:4
      },
      {
        body:'This got me feeling some typa way',
        songId:1,
        userId:5
      },
      {
        body:'I hope I get to see you live at a concert one day!',
        songId:3,
        userId:4
      },
      {
        body:'Listening to this on repeat, nonstop, all week',
        songId:3,
        userId:5
      },
      {
        body:'Yo, this is sick! Wish I discovered this sooner',
        songId:4,
        userId:1
      },
      {
        body:'What a bop, honestly. I can\'t stop replaying',
        songId:4,
        userId:2
      },
      {
        body:'I\'m in love with you, and the song',
        songId:4,
        userId:4
      },
      {
        body:'This wasn\'t my favorite release from you, but it\s still decent ig',
        songId:4,
        userId:5
      },
      {
        body:'This is a great song and anyone who says otherwise is just wrong',
        songId:5,
        userId:4
      },
      {
        body:'My dream is to be you one day.',
        songId:5,
        userId:4
      },
      {
        body:'Uhmmm uhhh meow',
        songId:6,
        userId:4
      },
      {
        body:'This song reminds me of my childhood',
        songId:6,
        userId:5
      },
      {
        body:'Yo, all my homies love this track. Keep it up',
        songId:7,
        userId:4
      },
      {
        body:'rawr xD this is so co0l :3',
        songId:7,
        userId:5
      },

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
