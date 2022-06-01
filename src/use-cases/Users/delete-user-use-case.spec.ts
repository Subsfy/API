import { DeleteUsersUseCase } from './delete-user-use-case'

const createUserSpy = jest.fn()
const findUsersSpy = jest.fn()
const selectUserSpy = jest.fn()
const deleteUsersSpy = jest.fn()

const deleteUsers = new DeleteUsersUseCase({
  create: createUserSpy,
  find: findUsersSpy,
  findById: selectUserSpy,
  delete: deleteUsersSpy
})

describe('Delete users', () => {
  it('not should be able to delete an not founded user', async () => {
    await expect(deleteUsers.execute('')).rejects.toThrow(new Error('Usuário não encontrado.'))

    expect(deleteUsersSpy).not.toHaveBeenCalled()
  })

  it('should be able to delete an user by id', async () => {
    selectUserSpy.mockResolvedValue({
      name: 'Jackson Arceno',
      email: 'jackson.f205@hotmail.com',
      avatar: 'https://github.com/jacksonfa.png',
      currency: 'real',
      payMethods: ['Nubank', 'Inter']
    })
    await expect(deleteUsers.execute('')).resolves.not.toThrow()

    expect(deleteUsersSpy).toHaveBeenCalled()
  })
})
