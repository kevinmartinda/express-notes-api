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

   for(let i = 0;i < 55;i++){
     data.push(
       {
         title: faker.random.words(3),
         note: faker.random.words(8),
         categoryId: faker.random.number({min: 1, max: 6}),
         createdAt: new Date(),
         updatedAt: new Date()
       }
     )
   }

   return queryInterface.bulkInsert('notes', data, {})
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
