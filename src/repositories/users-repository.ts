import { Users } from '@prisma/client'
import { IUserFindDTO, IUserFindUniqueDTO } from './../dtos/usersDTOS'
import { IUserDataDTO } from '../../src/dtos/usersDTOS'

export interface IUsersRepository {
  create: (data: IUserDataDTO) => Promise<Users>
  upsert: (data: IUserDataDTO) => Promise<Users>
  update: (userId: string, data: IUserDataDTO) => Promise<Users>
  find: ({ name, email }: IUserFindDTO) => Promise<Users[]>
  findUnique: ({ id, signId, email }: IUserFindUniqueDTO) => Promise<Users>
  findById: (userId: string) => Promise<Users>
  delete: (userId: string) => Promise<void>
}
