import { Users } from '@prisma/client'
import { IUserDataDTO } from './dtos/usersDTOS'

export interface IUsersRepository {
  create: (data: IUserDataDTO) => Promise<void>
  find: () => Promise<Users[]>
}
