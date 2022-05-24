import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { LoginUserUseCase } from './login-user-use-case'

const createUserSpy = jest.fn()
const upsertUserSpy = jest.fn()
const findUsersSpy = jest.fn()
const findUniqueSpy = jest.fn()
const selectUserSpy = jest.fn()
const deleteUserSpy = jest.fn()

const sendMailSpy = jest.fn()

const loginUser = new LoginUserUseCase({
  create: createUserSpy,
  upsert: upsertUserSpy,
  find: findUsersSpy,
  findUnique: findUniqueSpy,
  findById: selectUserSpy,
  delete: deleteUserSpy,
}, { sendMail: sendMailSpy })

describe('Login user', () => {
  it('should be able to not throw error at login of new user', async () => {
    const mockVerifyToken = jest.spyOn(OAuth2Client.prototype, 'verifyIdToken')
    mockVerifyToken.mockImplementation(() => Promise.resolve(new LoginTicket()))

    await expect(loginUser.execute({ token: 'unitTestToken', deviceType: 'android' })).resolves.not.toThrow()
  })

  it('should be able to not throw error at login of existing user', async () => {
    const mockVerifyToken = jest.spyOn(OAuth2Client.prototype, 'verifyIdToken')
    mockVerifyToken.mockImplementation(() => Promise.resolve(new LoginTicket()))

    await expect(loginUser.execute({ token: 'unitTestToken', deviceType: 'ios' })).resolves.not.toThrow()
  })
})
