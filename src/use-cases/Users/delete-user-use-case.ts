import { IUsersRepository } from '@repositories/users-repository'

export class DeleteUsersUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    await this.usersRepository.delete(userId)
  }
}
