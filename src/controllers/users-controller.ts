import { Body, Delete, Get, OperationId, Path, Post, Put, Query, Route, SuccessResponse, Tags } from 'tsoa'
import { Users } from '@prisma/client'
import { IUserDataDTO } from '../../src/dtos/usersDTOS'
import { NodemailMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@use-cases/Users/create-user-use-case'
import { UpdateUserUseCase } from '@use-cases/Users/update-user-use-case'
import { FindUsersUseCase } from '@use-cases/Users/find-users-use-case'
import { SelectUserUseCase } from '@use-cases/Users/select-user-use-case'
import { DeleteUsersUseCase } from '@use-cases/Users/delete-user-use-case'

@Route('users')
@Tags('Users')
export class UsersController {
  @SuccessResponse('201', 'Created')
  @Post()
  @OperationId('createUser')
  public async create(@Body() {
    name,
    email,
    avatar,
    currency,
    payMethods
  }: IUserDataDTO): Promise<Users> {

    const prismaUsersRepository = new PrismaUsersRepository()
    const nodemailerMailAdapter = new NodemailMailAdapter()

    const createUserUseCase = new CreateUserUseCase(
      prismaUsersRepository,
      nodemailerMailAdapter,
    )

    return createUserUseCase.execute({
      name,
      email,
      avatar,
      currency,
      payMethods
    })
  }

  @Put('{userId}')
  @OperationId('updateUser')
  public async update(@Path() userId: string, @Body() {
    name,
    email,
    avatar,
    currency,
    payMethods
  }: IUserDataDTO): Promise<Users> {

    const prismaUsersRepository = new PrismaUsersRepository()

    const updateUserUseCase = new UpdateUserUseCase(
      prismaUsersRepository,
    )

    return updateUserUseCase.execute(userId, {
      name,
      email,
      avatar,
      currency,
      payMethods
    })
  }

  @Get()
  @OperationId('listUsers')
  public async find(@Query() name?: string, @Query() email?: string): Promise<Users[]> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository)

    return findUsersUseCase.execute({ name, email })
  }

  @Get('{userId}')
  @OperationId('selectUser')
  public async findById(@Path() userId: string): Promise<Users> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const selectUserUseCase = new SelectUserUseCase(prismaUsersRepository)

    return selectUserUseCase.execute(userId)
  }

  @Delete('{userId}')
  @OperationId('deleteUser')
  public async delete(@Path() userId: string): Promise<void> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const deleteUserUseCase = new DeleteUsersUseCase(prismaUsersRepository)

    await deleteUserUseCase.execute(userId)
  }
}
