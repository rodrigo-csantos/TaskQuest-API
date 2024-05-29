const activityLogsModel = (sequelize, DataTypes) => {
	const ActivityLogs = sequelize.define('ActivityLogs', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
            references: {
				model: 'users',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		taskId: {
			type: DataTypes.INTEGER,
			allowNull: false,
            references: {
				model: 'tasks',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	ActivityLogs.associate = (models) => {
		ActivityLogs.belongsTo(models.users, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		ActivityLogs.belongsTo(models.tasks, {
			foreignKey: 'taskId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return ActivityLogs;
};

module.exports = activityLogsModel;