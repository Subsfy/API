import { IUserDataDTO } from '../../dtos/usersDTOS'
import { IUsersRepository } from '@repositories/users-repository'

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string, request: IUserDataDTO) {
    const {
      name,
      email
    } = request
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new Error('Usuário não encontrado.')
    }

    if (!name) {
      throw new Error('Nome é obrigatório.')
    }

    if (!email) {
      throw new Error('Email é obrigatório.')
    }

    const user = await this.usersRepository.update(userId, request)

    return user
  }
}
