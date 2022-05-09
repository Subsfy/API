import { Request, Response } from 'express'
import { NodemailMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ICreateUserCaseRequest } from '@use-cases/dtos/usersDTOS'
import { CreateUserUseCase } from '@use-cases/Users/create-user-use-case'
import { FindUsersUseCase } from '@use-cases/Users/find-users-use-case'
import { logger } from '../../src/winston'

export class UsersController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        name,
        email,
        avatar,
        currency,
        payMethods
      }: ICreateUserCaseRequest = req.body

      const prismaUsersRepository = new PrismaUsersRepository()
      const nodemailerMailAdapter = new NodemailMailAdapter()

      const createUserUseCase = new CreateUserUseCase(
        prismaUsersRepository,
        nodemailerMailAdapter,
      )

      await createUserUseCase.execute({
        name,
        email,
        avatar,
        currency,
        payMethods
      })

      return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso' })
    } catch (error) {
      logger.error('Error: Cadastro de usuário')
      logger.error(error)
      return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
    }
  }

  public find = async (req: Request, res: Response): Promise<Response> => {
    try {
      const prismaUsersRepository = new PrismaUsersRepository()

      const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository)

      const users = await findUsersUseCase.execute()

      return res.status(201).json({ success: true, message: 'Listagem de usuários', data: users })
    } catch (error) {
      logger.error('Error: Cadastro de usuário')
      logger.error(error)
      return res.status(500).json({ success: false, message: 'Não foi possível realizar o cadastro, verifique suas informações.' })
    }
  }
}
