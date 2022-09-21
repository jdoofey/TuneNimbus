'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Mulch Fantasy',
        userId: 1,
        albumId:3,
        description:'Hamburgers! The cornerstone of any nutritious breakfast.',
        previewImage:"https://i.imgur.com/4gGq9P7.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-rock-king-around-here-15045.mp3"
      },
      {
        title: 'Ocean Drive',
        userId: 1,
        albumId:3,
        description:'I must be a mermaid. I have no fear of depths and a great fear of shallow living.',
        previewImage:"https://i.imgur.com/ppw5Hps.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/08/23/audio_d16737dc28.mp3?filename=electronic-future-beats-117997.mp3"
      },
      {
        title: 'Cracks in the Sky',
        userId: 2,
        albumId: 1,
        description:'You don\'t get to choose if you get hurt in this world...but you do have some say in who hurts you. I like my choices.',
        previewImage: "https://i.imgur.com/r1homGY.jpg",
        url:"https://cdn.pixabay.com/download/audio/2021/12/22/audio_9da2a60074.mp3?filename=penguinmusic-modern-chillout-future-calm-12641.mp3"
      },
      {
        title: 'Pure Spectrum',
        userId: 3,
        albumId:2,
        description:'So, this is my life. And I want you to know that I am both happy and sad and I\'m still trying to figure out how that could be.',
        previewImage: "https://i.imgur.com/m4ov4dg.jpg",
        url:"https://cdn.pixabay.com/download/audio/2021/12/13/audio_b9c0dc9e48.mp3?filename=chill-abstract-intention-12099.mp3"
      },
      {
        title: 'Black Sheep',
        userId: 1,
        albumId: 3,
        description:'Leave the gun. Take the cannoli.',
        previewImage:"https://i.imgur.com/3ysdWn1.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc48af67b2.mp3?filename=slow-trap-18565.mp3"
      },
      {
        title: 'Electric Avenue',
        userId: 1,
        albumId: 3,
        description:'A group of penguins is called a waddle',
        previewImage:"https://i.imgur.com/tuootrz.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/08/17/audio_eb3864cceb.mp3?filename=the-weekend-117427.mp3"
      },
      {
        title: 'Pinky Rangs',
        userId: 1,
        albumId: 3,
        description:'A group of bunnies is called a fluffle',
        previewImage:"https://i.imgur.com/ScBcgka.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/04/27/audio_67bcf729cf.mp3?filename=whip-110235.mp3"
      },
      {
        title: 'Double Up',
        userId: 1,
        albumId: 3,
        description:'Do you ever have a dream that you uh could that you that...',
        previewImage:"https://i.imgur.com/aecQvEW.jpg",
        url:"https://cdn.pixabay.com/download/audio/2022/08/25/audio_4f3b0a816e.mp3?filename=tuesday-glitch-soft-hip-hop-118327.mp3"
      },
      {
        title: 'Tuesday',
        userId: 1,
        albumId: 3,
        description:'It officially takes 364 licks to get to the center of a Tootsie Pop',
        previewImage:"https://i.imgur.com/9hFnGP3.jpg",
        url:"https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b32e02f9.mp3?filename=jazzy-abstract-beat-11254.mp3"
      },
      {
        title: 'Republic of One',
        userId: 1,
        albumId: 3,
        description:'The first person convicted of speeding was going eight mph.',
        previewImage:"https://i.imgur.com/aecQvEW.jpg",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
      },
      {
        title: '',
        userId: 1,
        albumId: 3,
        description:'',
        previewImage:"",
        url:""
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
