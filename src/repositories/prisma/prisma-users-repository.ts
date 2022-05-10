import { Users } from '@prisma/client'
import { IUserDataDTO, IUserFindDTO } from '../../../src/dtos/usersDTOS'
import { prisma } from '../../prisma'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: IUserDataDTO): Promise<Users> {
    return prisma.users.create({ data })
  }

  async find({ name, email }: IUserFindDTO): Promise<Users[]> {
    return prisma.users.findMany({
      where: {
        name: {
          contains: name || ''
        },
        email: {
          contains: email || ''
        }
      }
    })
  }

  async findById(userId: string): Promise<Users> {
    return prisma.users.findUnique({
      where: {
        id: userId
      }
    })
  }

  async delete(userId: string): Promise<void> {
    await prisma.users.delete({
      where: {
        id: userId
      }
    })
  }
}
