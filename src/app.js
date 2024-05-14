const express = require('express')

const app = express()

app.use(express.json())

const tasksHandler = require('./routes/taskHandlers.router')

app.use (tasksHandler)

module.exports = app