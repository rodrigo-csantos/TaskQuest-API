require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

app.listen(process.env.PORT, async () => {
	try {
		await sequelize.authenticate();
		console.log(`Database connected successfully!`);
	} catch (error) {
		console.log(`Failed to connect: ${error.message}`);
	}
	console.log(`Server running on port ${process.env.PORT}...`);
});
