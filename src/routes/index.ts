import express from 'express'

const app = express()

export class Routes {
    get routes() {
        app.use('/', (req, res) => {
            res.status(200).json({ success: true, message: 'API Running!' })
        })

        return app
    }
}