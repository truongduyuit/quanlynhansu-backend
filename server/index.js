import './common/env'
import Database from './common/database'
import ExpressServer from './common/server'
import routes from './routers'

const port = process.env.PORT || "4444"

const connectionString = process.env.MONGODB_URI_DEV

const db = new Database(connectionString)

export default new ExpressServer()
                    .database(db)
                    .router(routes)
                    .listen(port)