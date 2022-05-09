import { UserDataDTO } from "./dtos/usersDTOS";

export interface UsersRepository {
  create: (data: UserDataDTO) => Promise<void>
}