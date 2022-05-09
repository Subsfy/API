import { Router } from 'express'
import { UsersController } from '@controllers/users-controller'

const router = Router()

export class UserRoutes {
  constructor(
    private userController = new UsersController()
  ) {}

  get routes() {
    const controller = this.userController

    router.post('/users', controller.create)
    router.get('/users', controller.find)

    return router
  }
}
