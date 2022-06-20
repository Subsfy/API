type ILoginUserInputData = {
  signId: string,
  name: string,
  email: string,
  avatar: string,
}

export class LoginUserInputData {
  signId: string
  name: string
  email: string
  avatar: string
  
  constructor({ signId, name, email, avatar }: ILoginUserInputData) {
    this.signId = signId
    this.name = name
    this.email = email
    this.avatar = avatar
  }
}
