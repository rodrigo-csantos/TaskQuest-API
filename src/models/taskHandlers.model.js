const taskHandlerModel = (sequelize, DataTypes) => {
	const taskHandler = sequelize.define('tasks', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: DataTypes.TEXT,
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		owner: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
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
	return taskHandler;
};

module.exports = taskHandlerModel;
