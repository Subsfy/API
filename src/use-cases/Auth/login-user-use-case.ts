import { OAuth2Client } from 'google-auth-library'
import { IMailAdapter } from '@adapters/mail-adapter'
import { IUsersRepository } from '@repositories/users-repository'
import { IUserDataDTO } from '../../dtos/usersDTOS'
import { Users } from '@prisma/client'

export class LoginUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailAdapter: IMailAdapter
  ) {}

  async execute(token: string): Promise<Users> {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    const ticket = await client.verifyIdToken({ idToken: token })
    const payload = ticket.getPayload()
    const signId = payload?.sub || ''

    const user: IUserDataDTO = {
      signId,
      name: payload?.name,
      email: payload?.email,
      avatar: payload?.picture,
      currency: 'real',
      payMethods: ['credit'],
      sessionActive: true,
    }

    const existsEmail = await this.usersRepository.findUnique({ email: payload?.email || '' })
    const result = await this.usersRepository.upsert(user)

    if (!existsEmail) {
      await this.mailAdapter.sendMail({
        to: result?.email,
        subject: `Seja muito bem vindo ${result?.name}!`,
        body: [
          '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
          `<p>Olá: ${result?.name}</p>`,
          '</div>',
        ].join('\n')
      })
    }

    return result
  }
}
