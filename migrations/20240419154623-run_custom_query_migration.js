'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the users table is empty
    const users = await queryInterface.sequelize.query('SELECT * FROM users');
    if (users[0].length === 0) {
      // users[0] will contain the result rows
      // Insert a dummy user
      await queryInterface.bulkInsert('users', [
        {
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@yopmail.com',
          password:
            '$2b$04$gNF.YvYIgDCI7iGShAcB6O9gAG3lSTNE5HxrKPteB64CLJdIjc7pG', //this is hashed password real password is 123456
          phone_number: '1234567890',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {},
};
