import { CreateUserUseCase } from "./create-user-use-case"

const createUserSpy = jest.fn()
const sendMailSpy = jest.fn()

const createUser = new CreateUserUseCase(
  { create: createUserSpy },
  { sendMail: sendMailSpy }
)

describe('Create user', () => {
  it('should be able to create an User', async () => {
    await expect(createUser.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).resolves.not.toThrow()

    expect(createUserSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit an User without name', async () => {
    await expect(createUser.execute({
      name: '',
      email: 'teste@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).rejects.toThrow()
  })

  it('should not be able to submit an User without email', async () => {
    await expect(createUser.execute({
      name: 'Teste',
      email: '',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).rejects.toThrow()
  })
})