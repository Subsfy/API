import { MailAdapter } from "../../adapters/mail-adapter"
import { UsersRepository } from "../../repositories/users-repository"
import { CreateUserCaseRequest } from "../dtos/usersDTOS"

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: CreateUserCaseRequest) {
    const {
      name,
      email
    } = request;

    if (!name) {
      throw new Error('Name is required.')
    }

    if (!email) {
      throw new Error('Email is required.')
    }

    await this.usersRepository.create(request)

    await this.mailAdapter.sendMail({
      to: email,
      subject: `Seja muito bem vindo ${name}!`,
      body: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
          `<p>Olá: ${name}</p>`,
          `</div>`,
      ].join('\n')
    })
  }
}