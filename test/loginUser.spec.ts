import { LoginUser } from '../src/domain/usecase/LoginUser'
import { RepositoryMemoryFactory } from '../src/adapter/factory/RepositoryMemoryFactory'
import { LoginUserInputData } from '../src/domain/usecase/DTOs/LoginUserInputData'

let loginUser: LoginUser

beforeAll(() => {
  loginUser = new LoginUser(new RepositoryMemoryFactory)
})

describe('Login user', () => {
  it('should not login with invalid name', async () => {
    const userInput = new LoginUserInputData({
      signId: '123',
      name: 'John',
      email: 'john@example.com',
      avatar: 'http://example.com/avatar/john.jpg',
    })
    await expect(() => loginUser.execute(userInput))
      .rejects.toThrow(new Error('Invalid name'))
  })

  it('should not login with invalid email', async () => {
    const userInput = new LoginUserInputData({
      signId: '123',
      name: 'John Doe',
      email: 'john.example.com',
      avatar: 'http://example.com/avatar/john.jpg',
    })
    await expect(() => loginUser.execute(userInput))
      .rejects.toThrow(new Error('Invalid email'))
  })

  it('should be able login with an new user', async () => {
    const userInput = new LoginUserInputData({
      signId: '123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'http://example.com/avatar/john.jpg',
    })
    const userLogged = await loginUser.execute(userInput)
    expect(userLogged.firstSession).toBeTruthy()
  })

  it('should be able to login with an existing user', async () => {
    const userInput = new LoginUserInputData({
      signId: '456',
      name: 'John Three',
      email: 'john3@example.com',
      avatar: 'http://example.com/avatar/john3.jpg',
    })
    await loginUser.execute(userInput)
    const userLogged = await loginUser.execute(userInput)
    expect(userLogged.firstSession).toBeFalsy()
  })
})
