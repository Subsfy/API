import { Users } from '@prisma/client'
import { IUserDataDTO, IUserFindDTO } from '../../src/dtos/usersDTOS'
import { NodemailMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@use-cases/Users/create-user-use-case'
import { FindUsersUseCase } from '@use-cases/Users/find-users-use-case'
import { SelectUserUseCase } from '@use-cases/Users/select-user-use-case'
import { DeleteUsersUseCase } from '@use-cases/Users/delete-user-use-case'

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

  public async find(data: IUserFindDTO): Promise<Users[]> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository)

    return findUsersUseCase.execute(data)
  }

  public async findById(userId: string): Promise<Users> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const selectUserUseCase = new SelectUserUseCase(prismaUsersRepository)

    return selectUserUseCase.execute(userId)
  }

  public async delete(userId: string): Promise<void> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const deleteUserUseCase = new DeleteUsersUseCase(prismaUsersRepository)

    await deleteUserUseCase.execute(userId)
  }
}
