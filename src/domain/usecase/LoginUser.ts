import { User } from '../entity/User'
import { IRepositoryAbstractFactory } from '../factory/RepositoryAbstractFactory'
import { IUserRepository } from '../repository/UserRepository'
import { LoginUserInputData } from './DTOs/LoginUserInputData'
import { LoginUserOutputData } from './DTOs/LoginUserOutputData'

export class LoginUser {
  userRepository: IUserRepository

  constructor(repositoryFactory: IRepositoryAbstractFactory) {
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute(loginUserInputData: LoginUserInputData): Promise<LoginUserOutputData> {
    const userAlreadyExists = await this.userRepository.findByEmail(loginUserInputData.email)
    const user = new User({
      id: userAlreadyExists?.id || undefined,
      signId: loginUserInputData.signId,
      name: loginUserInputData.name,
      email: loginUserInputData.email,
      avatar: loginUserInputData.avatar,
      currency: userAlreadyExists?.currency || null,
      payMethods: userAlreadyExists?.payMethods || null,
      sessionActive: userAlreadyExists?.sessionActive || null,
    })
    if (userAlreadyExists) { await this.userRepository.update(user) }
    else { await this.userRepository.save(user) }
    return new LoginUserOutputData({
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      avatar: user.avatar,
      firstSession: !userAlreadyExists
    })
  }
}
