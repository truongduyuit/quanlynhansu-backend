import express from 'express'
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import os from 'os'
import http from 'http'
import { CronJob } from "cron"
import cookieParser from 'cookie-parser'

import installValidator from './openapi'
import logger from './logger'

const app = express()

export default class ExpressServer {
    constructor() {
        const root = path.normalize(__dirname + "/../../..")

        app.set("appPath", root + "client")
        app.use(morgan("dev"))
        app.use(express.json({ limit: process.env.REQUEST_LIMIT || "100kb" }))
        app.use(helmet())
        app.use(
            express.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || "100kb",
            })
        )
        app.use(cors())
        app.use(cookieParser(process.env.SESSION_SECRET))
        app.use(express.static(`${root}/public`));

        try {
            require("fs").mkdirSync("./log");
        } catch (e) {
            if (e.code != "EEXIST") {
                console.error("Could not set up log directory, error was: ", e);
                process.exit(1);
            }
        }
    }

    router(routes) {
        installValidator(app, routes)
        return this
    }

    database(db) {
        db.init()
        return this
    }

    cronJob(time, job) {
        const task = new CronJob(time, job, null, true, "Asia/Ho_Chi_Minh")
        task.start()
        return this
    }

    listen(port) {
        const welcome = port => {
            logger.info(
                `Server is running in ${process.env.NODE_ENV || "development"} @: ${os.hostname()} on port: ${port}`
            )
        }

        http.createServer(app).listen(port, welcome(port))
        return app
    }
}