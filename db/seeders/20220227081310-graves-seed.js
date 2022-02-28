'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let graves = [];
    for (let i = 0; i < 10; i++) {
      graves.push({
        title: faker.commerce.productAdjective() + " grave",
        img: `/img/graves/${i}.jpg`,
        UserId: faker.datatype.number({ min: 1, max: 2 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Graves', graves, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Graves', null, {});
  }
};
