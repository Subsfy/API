import { Router } from 'express'
import { UsersController } from '@controllers/users-controller'
import { logger } from '@winston'

const router = Router()

export class UserRoutes {
  constructor(
    private userController = new UsersController()
  ) {}

  get routes() {
    const controller = this.userController

    router.post('/users', (req, res) => {
      try {
        controller.create(req.body)

        return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso' })
      } catch (error) {
        logger.error('Error: Cadastro de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })
    router.get('/users', (req, res) => {
      try {
        const users = controller.find()

        return res.status(201).json({ success: true, message: 'Listagem de usuários', data: users })
      } catch (error) {
        logger.error('Error: Cadastro de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })

    return router
  }
}
