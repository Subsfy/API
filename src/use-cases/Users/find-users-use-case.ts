import { Users } from '@prisma/client'
import { IUsersRepository } from '@repositories/users-repository'
import { IUserFindDTO } from '../../../src/dtos/usersDTOS'

export class FindUsersUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IUserFindDTO): Promise<Users[]> {
    const users = await this.usersRepository.find(data)
    return users
  }
}
