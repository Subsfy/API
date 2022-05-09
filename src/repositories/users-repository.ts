import { Users } from '@prisma/client'
import { IUserDataDTO } from '../../src/dtos/usersDTOS'

export interface IUsersRepository {
  create: (data: IUserDataDTO) => Promise<void>
  find: () => Promise<Users[]>
}
