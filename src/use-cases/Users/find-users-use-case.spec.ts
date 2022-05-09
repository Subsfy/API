import { FindUsersUseCase } from './find-users-use-case'

const createUserSpy = jest.fn()
const findUsersSpy = jest.fn()
findUsersSpy.mockResolvedValue([{
  name: 'Jackson Arceno',
  email: 'jackson.f205@hotmail.com',
  avatar: 'https://github.com/jacksonfa.png',
  currency: 'real',
  payMethods: ['Nubank', 'Inter']
}])

const findUsers = new FindUsersUseCase(
  { create: createUserSpy, find: findUsersSpy },
)

describe('List users', () => {
  it('should be able to list created users', async () => {
    await expect(findUsers.execute()).resolves.not.toThrow()

    const users = await findUsers.execute()
    expect(users.length).toBeGreaterThan(0)

    expect(findUsersSpy).toHaveBeenCalled()
  })
})
