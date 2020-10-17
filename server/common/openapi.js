import errorHandler from '../middleware/error.handler'

export default function openapi(app, routers) {
    routers(app)
    app.use(errorHandler)
}