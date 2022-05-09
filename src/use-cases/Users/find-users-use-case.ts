import { Users } from '@prisma/client'
import { IUsersRepository } from '@repositories/users-repository'

export class FindUsersUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<Users[]> {
    const users = await this.usersRepository.find()
    return users
  }
}
