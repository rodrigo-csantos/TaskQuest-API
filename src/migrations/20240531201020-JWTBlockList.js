// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('JWTBlockLists', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			token: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('JWTBlockLists');
	},
};
