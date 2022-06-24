type ILoginUserOutputData = {
  id: string,
  name: string,
  email: string,
  avatar: string,
  firstSession: boolean,
}

export class LoginUserOutputData {
  id: string
  name: string
  email: string
  avatar: string
  firstSession: boolean
  
  constructor({ id, name, email, avatar, firstSession }: ILoginUserOutputData) {
    this.id = id
    this.name = name
    this.email = email
    this.avatar = avatar
    this.firstSession = firstSession
  }
}
