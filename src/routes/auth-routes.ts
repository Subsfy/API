import { Router } from 'express'
import { AuthController } from '@controllers/auth-controllers'
import { logger } from '@winston'

const router = Router()

export class AuthRoutes {
  constructor(
    private authController = new AuthController()
  ) {}

  get routes() {
    const controller = this.authController

    router.post('/login', async (req, res) => {
      try {
        const { token, deviceType } = req.body
        const user = await controller.login({ token, deviceType })

        return res.status(200).json({ success: true, message: 'Login realizado com sucesso', data: user })
      } catch (error) {
        logger.error('Error: Login de usuário')
        logger.error(error)

        return res.status(500).json({ success: false, message: 'Não foi possível realizar o login, verifique suas informações.' })
      }
    })

    return router
  }
}
