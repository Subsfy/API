import { User } from '../entity/User'

export interface IUserRepository {
  save(user: User): Promise<void>
  update(user: User): Promise<void>
  findByEmail(email: string): Promise<User>
}
