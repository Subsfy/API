import { User } from '@domain/entity/User'
import { IUserRepository } from '@domain/repository/UserRepository'
import { uuid } from 'uuidv4'

export class UserRepositoryMemory implements IUserRepository {
  users: User[]

  constructor() {
    this.users = []
  }

  async save(user: User): Promise<void> {
    user.id = uuid()
    this.users.push(user)
  }

  async update(user: User): Promise<void> {
    this.users.findIndex((value, index, array) => value.email.value === user.email.value ? array.splice(index, 1, user) : null)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email.value === email)
  }
}
