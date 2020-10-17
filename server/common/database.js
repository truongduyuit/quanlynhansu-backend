import bluebird from 'bluebird'
import mongoose from 'mongoose'
import logger from './logger'

export default class Database {
    constructor(connectionString) {
        this.connectionString = connectionString
    }

    init() {
        mongoose.Promise = bluebird
        mongoose.connect(this.connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: true,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        })
        .then(() => {
            logger.info(`Connect to database success`)
        })
        .catch(err => {
            logger.error("Connect mongodb error. Please sure mongodb is running:\n" + err)
        })

        const db = mongoose.connection
        db.on("error", err => logger.error("Connect mongodb error:\n" + err))
    }
}