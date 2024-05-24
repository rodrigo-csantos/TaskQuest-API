// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', { 
       id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
			  allowNull: false,
			  primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      idAvatar: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
