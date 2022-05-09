import express from 'express'
import { UserRoutes } from './users-routes';

const app = express()

export class Routes {
  get routes() {
    app.use("/", new UserRoutes().routes);

    app.get('/test', (req, res) => {
      res.status(200).json({ success: true, message: 'API Running!' })
    })

    return app
  }
}