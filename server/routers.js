import router from './api/router'

export default function routes(app) {
    app.get("/", (req, res) => {
        res.send("nothing")
    })

    app.use("/api", router)
}