import { IMailAdapter } from '@adapters/mail-adapter'
import { IUserDataDTO } from '../../../src/dtos/usersDTOS'
import { IUsersRepository } from '@repositories/users-repository'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(request: IUserDataDTO) {
    const {
      name,
      email
    } = request

    if (!name) {
      throw new Error('Nome é obrigatório.')
    }

    if (!email) {
      throw new Error('Email é obrigatório.')
    }

    const user = await this.usersRepository.create(request)

    await this.mailAdapter.sendMail({
      to: email,
      subject: `Seja muito bem vindo ${name}!`,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Olá: ${name}</p>`,
        '</div>',
      ].join('\n')
    })

    return user
  }
}
