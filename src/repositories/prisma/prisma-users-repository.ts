import { UserDataDTO } from "../dtos/usersDTOS";
import { prisma } from "../../prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserDataDTO) {
    await prisma.users.create({ data })
  }
}