import { Users } from '@prisma/client'
import { User } from '@domain/entity/User'
import { prisma } from '@infra/database/prisma'
import { IUserRepository } from '@domain/repository/UserRepository'

export class UserRepositoryDatabase implements IUserRepository {
  async save(user: User): Promise<void> {
    const newUser: Users = {
      id: undefined,
      signId: user.signId,
      name: user.name.value,
      email: user.email.value,
      avatar: user.avatar,
      createdAt: new Date(),
      currency: null,
      payMethods: null,
      sessionActive: true,
    }
    await prisma.users.create({ data: newUser })
  }

  async update(user: User): Promise<void> {
    const newUser: Users = {
      id: user.id,
      signId: user.signId,
      name: user.name.value,
      email: user.email.value,
      avatar: user.avatar,
      createdAt: undefined,
      currency: user.currency,
      payMethods: user.payMethods,
      sessionActive: true,
    }
    await prisma.users.update({
      where: {
        id: user.id
      },
      data: newUser
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.users.findFirst({
      where: {
        email: {
          contains: email || ''
        }
      }
    })
    if (!user) throw new Error('User not found')
    return new User({
      id: user.id,
      signId: user.signId,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      currency: user.currency,
      payMethods: user.payMethods,
      sessionActive: true,
    })
  }
}
