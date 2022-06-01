import express from 'express'
import { AuthRoutes } from './auth-routes'
import { UserRoutes } from './users-routes'

const app = express()

export class Routes {
  get routes() {
    app.use('/auth', new AuthRoutes().routes)
    app.use('/users', new UserRoutes().routes)

    app.get('/', (req, res) => {
      res.status(200).json({ success: true, message: 'API Running!' })
    })

    return app
  }
}
