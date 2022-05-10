import { IUserFindDTO } from './../dtos/usersDTOS'
import { Users } from '@prisma/client'
import { IUserDataDTO } from '../../src/dtos/usersDTOS'

export interface IUsersRepository {
  create: (data: IUserDataDTO) => Promise<void>
  find: ({ name, email }: IUserFindDTO) => Promise<Users[]>
  findById: (userId: string) => Promise<Users>
  delete: (userId: string) => Promise<void>
}
