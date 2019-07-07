'use strict';
const faker = require('faker')


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const data = []

    for(let i = 0; i < 6;i++){
      data.push({
        name: faker.random.words(1),
        createdAt: faker.date.between({from: '2019-06-01', to: '2016-06-30'}),
        updatedAt: faker.date.between({from: '2019-06-01', to: '2016-06-30'})
      })
    }

    return queryInterface.bulkInsert('categories', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
