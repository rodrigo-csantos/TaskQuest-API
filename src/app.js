const express = require('express');

const app = express();

app.use(express.json());

const tasksHandler = require('./routes/taskHandlers.router');
app.use(tasksHandler);

const createUser = require('./routes/createUser.router');
app.use(createUser);

const login = require('./routes/login.router');
app.use(login);

module.exports = app;
