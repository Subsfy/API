import { Users } from '@prisma/client'
import { IUserDataDTO } from '../../src/dtos/usersDTOS'
import { NodemailMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@use-cases/Users/create-user-use-case'
import { FindUsersUseCase } from '@use-cases/Users/find-users-use-case'

export class UsersController {
  public async create({
    name,
    email,
    avatar,
    currency,
    payMethods
  }: IUserDataDTO): Promise<void> {

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
  }

  public async find(): Promise<Users[]> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository)

    return findUsersUseCase.execute()
  }
}
