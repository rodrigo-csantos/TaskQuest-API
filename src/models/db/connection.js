const Sequelize = require('sequelize')
const dotenv = require('dotenv')
const config = require('../../config/index')

dotenv.config()

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
})

module.exports = { sequelize }
