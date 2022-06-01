import { UpdateUserUseCase } from './update-user-use-case'

const updateUserSpy = jest.fn()
const findUsersSpy = jest.fn()
const selectUserSpy = jest.fn()
const deleteUserSpy = jest.fn()

const updateUser = new UpdateUserUseCase({
  update: updateUserSpy,
  find: findUsersSpy,
  findById: selectUserSpy,
  delete: deleteUserSpy,
})

describe('update user', () => {
  it('should not be able to update an User not found', async () => {
    await expect(updateUser.execute('', {
      name: '',
      email: 'teste@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).rejects.toThrow(new Error('Usuário não encontrado.'))
  })

  it('should not be able to update an User without name', async () => {
    selectUserSpy.mockResolvedValue({
      name: 'Teste Fail',
      email: 'testefailt@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })

    await expect(updateUser.execute('', {
      name: '',
      email: 'teste@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).rejects.toThrow(new Error('Nome é obrigatório.'))
  })

  it('should not be able to update an User without email', async () => {
    selectUserSpy.mockResolvedValue({
      name: 'Teste Fail',
      email: 'testefailt@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })

    await expect(updateUser.execute('', {
      name: 'Teste',
      email: '',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).rejects.toThrow(new Error('Email é obrigatório.'))
  })

  it('should be able to update an User', async () => {
    selectUserSpy.mockResolvedValue(true) 
    updateUserSpy.mockResolvedValue(true)

    await expect(updateUser.execute('', {
      name: 'Teste',
      email: 'teste@teste.com',
      avatar: '',
      currency: 'real',
      payMethods: ['credit', 'pix']
    })).resolves.not.toThrow()

    expect(updateUserSpy).toHaveBeenCalled()
  })
})
