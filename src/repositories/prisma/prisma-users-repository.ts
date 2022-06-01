import { Users } from '@prisma/client'
import { IUserDataDTO, IUserFindDTO, IUserFindUniqueDTO } from '../../../src/dtos/usersDTOS'
import { prisma } from '../../prisma'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: IUserDataDTO): Promise<Users> {
    return prisma.users.create({ data })
  }

  async update(userId:string, data: IUserDataDTO): Promise<Users> {
    return prisma.users.update({
      where: {
        id: userId
      },
      data
    })
  }

  async upsert(data: IUserDataDTO): Promise<Users> {
    return prisma.users.upsert({
      where: {
        signId: data.signId
      },
      update: {
        sessionActive: data.sessionActive
      },
      create: data
    })
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

  async findUnique({ id, signId, email }: IUserFindUniqueDTO): Promise<Users> {
    return prisma.users.findFirst({
      where: {
        id: {
          contains: id || '' 
        },
        signId: {
          contains: signId || ''
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
