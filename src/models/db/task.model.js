const { Sequelize } = require("sequelize");
const { sequelize } = require("./connection");

const task = sequelize.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    taskName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.TEXT,
    owner: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = { task }