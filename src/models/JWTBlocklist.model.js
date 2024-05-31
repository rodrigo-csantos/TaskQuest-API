const JWTBlockListsModel = (sequelize, DataTypes) => {
	const JWTBlockList = sequelize.define(
		'JWTBlockLists',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			token: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);

	return JWTBlockList;
};

module.exports = JWTBlockListsModel;
