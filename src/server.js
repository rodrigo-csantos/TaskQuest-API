const dotenv = require('dotenv')
dotenv.config()

const app = require('./app')
const {sequelize} = require('./models/db/connection')
const config = require('./config/index')

app.listen(config.app.port, async ()=> {

    try {
        await sequelize.authenticate()
        console.log(`Database connected successfully!`);
        const {task} = require('./models/db/task.model')
        await sequelize.sync()
        console.log(`'Database synchronized successfully.'`)
    } catch (error) {
        console.log(`Failed to connect: ${error.message}`);
    }
    
    console.log(`Server running on port ${config.app.port}...`)
})