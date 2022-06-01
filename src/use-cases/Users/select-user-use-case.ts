import { Users } from '@prisma/client'
import { IUsersRepository } from '@repositories/users-repository'

export class SelectUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<Users> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    return user
  }
}
