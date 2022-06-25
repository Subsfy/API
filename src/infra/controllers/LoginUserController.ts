import { RepositoryDatabaseFactory } from '@adapter/factory/RepositoryDatabaseFactory'
import { LoginUserInputData } from '@domain/usecase/DTOs/LoginUserInputData'
import { LoginUserOutputData } from '@domain/usecase/DTOs/LoginUserOutputData'
import { Body, OperationId, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { LoginUser } from '@domain/usecase/LoginUser'
import { GoogleAuth } from '../auths/GoogleAuth'
import { Nodemailer } from '../mailers/NodeMailer'

interface ILoginRequest {
  token: string
  deviceType: string
}

@Route('auth')
@Tags('Authorization')
export class AuthController {
  @SuccessResponse('200', 'Logged')
  @Post('/login')
  @OperationId('loginUser')
  public async login(@Body() { token, deviceType }: ILoginRequest): Promise<LoginUserOutputData> {
    const repositoryDatabaseFactory = new RepositoryDatabaseFactory()
    const googleAuth = new GoogleAuth(token, deviceType)
    await googleAuth.authenticate()
    const { signId, name, email, avatar } = googleAuth
    const userInput = new LoginUserInputData({ signId, name, email, avatar })
    const loginUser = new LoginUser(repositoryDatabaseFactory)
    const userLogged = await loginUser.execute(userInput)
    if (userLogged.firstSession) {
      await new Nodemailer().sendMail({
        to: userLogged.email,
        subject: `Seja muito bem vindo ${userLogged.name}!`,
        body: [
          '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
          `<p>Olá: ${userLogged.name}</p>`,
          '</div>',
        ].join('\n')
      })
    }
    return userLogged
  }
}
