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
		owner: DataTypes.STRING,
		status: DataTypes.STRING,
	});
	return taskHandler;
};

module.exports = taskHandlerModel;
