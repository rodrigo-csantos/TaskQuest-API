const { users } = require('../models')

const login = async (email, password) => {
    const loggedUser = await users.findOne({ where: {email: email, password: password}})
    return loggedUser
}

module.exports = {
    login
}