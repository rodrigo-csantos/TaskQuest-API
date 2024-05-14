module.exports = {
    app: {
        port: process.env.PORT
    },
    db: {
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST
    }
}