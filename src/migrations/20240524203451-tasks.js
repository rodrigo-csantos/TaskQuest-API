// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tasks', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			taskName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			owner: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('tasks');
	},
};
