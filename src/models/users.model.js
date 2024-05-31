const usersModel = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		idAvatar: DataTypes.INTEGER,
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

	users.associate = (models) => {
		users.hasMany(models.tasks, {
			foreignKey: 'owner',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		users.hasMany(models.ActivityLogs, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
	};

	return users;
};

module.exports = usersModel;
