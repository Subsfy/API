import { Body, OperationId, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { NodemailMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { LoginUserUseCase } from '@use-cases/Auth/login-user-use-case'
import { Users } from '@prisma/client'
import { ILoginRequest } from '../dtos/authDTO'

@Route('auth')
@Tags('Authorization')
export class AuthController {
  @SuccessResponse('200', 'Logged')
  @Post('/login')
  @OperationId('loginUser')
  public async login(@Body() { token, deviceType }: ILoginRequest): Promise<Users> {
    const prismaUsersRepository = new PrismaUsersRepository()
    const nodemailerMailAdapter = new NodemailMailAdapter()

    const loginUserUseCase = new LoginUserUseCase(
      prismaUsersRepository,
      nodemailerMailAdapter
    )

    return loginUserUseCase.execute({ token, deviceType })
  }
}
