'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John',
        lastName: 'Smith'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John2',
        lastName: 'Smith2'
      },
      {
        email: 'awakeness@apple.com',
        username: 'bubkun42',
        hashedPassword: bcrypt.hashSync('iloveandroid'),
        firstName: 'Jade',
        lastName: 'Goblin'
      },
      {
        email: 'flexbox@flex.io',
        username: 'displayflex4lyfe',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Flex',
        lastName: 'Boxx'
      },
      {
        email: 'python@snek.io',
        username: 'IhateBrackets',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Snakey',
        lastName: 'Hissboy'
      },
      {
        email: "rllyshortgirl@tiny.com",
        username: "˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞keshort",
        hashedPassword: bcrypt.hashSync('androiduser:c'),
        firstName: 'Shelly',
        lastName: 'Kaowo'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
