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

    router.post('/users', async (req, res) => {
      try {
        await controller.create(req.body)

        return res.status(201).json({ success: true, message: 'Cadastro de usuário realizado com sucesso' })
      } catch (error) {
        logger.error('Error: Cadastro de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })

    router.get('/users', async (req, res) => {
      try {
        const data = req.query
        const users = await controller.find(data)

        return res.status(200).json({ success: true, message: 'Listagem de usuários', data: users })
      } catch (error) {
        logger.error('Error: Listagem de usuários')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })

    router.get('/users/:userId', async (req, res) => {
      try {
        const { userId } = req.params
        const user = await controller.findById(userId)

        return res.status(200).json({ success: true, message: 'Informações do usuário', data: user })
      } catch (error) {
        logger.error('Error: Seleção de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })

    router.delete('/users/:userId', async (req, res) => {
      try {
        const { userId } = req.params
        await controller.delete(userId)

        return res.status(200).json({ success: true, message: 'Usuário excluído com sucesso' })
      } catch (error) {
        logger.error('Error: Exclusão de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
      }
    })

    return router
  }
}
