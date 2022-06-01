import { SelectUserUseCase } from './select-user-use-case'

const createUserSpy = jest.fn()
const findUsersSpy = jest.fn()
const selectUserSpy = jest.fn()
const deleteUserSpy = jest.fn()

const selectUser = new SelectUserUseCase({
  create: createUserSpy,
  find: findUsersSpy,
  findById: selectUserSpy,
  delete: deleteUserSpy,
})

describe('Select user', () => {
  it('not should be able to select an not exists user', async () => {
    await expect(selectUser.execute('')).rejects.toThrow(new Error('Usuário não encontrado.'))
  })

  it('should be able to select an users', async () => {
    selectUserSpy.mockResolvedValue({
      name: 'Jackson Arceno',
      email: 'jackson.f205@hotmail.com',
      avatar: 'https://github.com/jacksonfa.png',
      currency: 'real',
      payMethods: ['Nubank', 'Inter']
    })
    await expect(selectUser.execute('')).resolves.not.toThrow()

    expect(selectUserSpy).toHaveBeenCalled()
  })
})
