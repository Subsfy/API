import { IUserDataDTO } from '../../../src/dtos/usersDTOS'
import { prisma } from '../../prisma'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: IUserDataDTO) {
    await prisma.users.create({ data })
  }

  async find() {
    return prisma.users.findMany()
  }
}
