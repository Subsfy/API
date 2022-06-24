import { Name } from './VOs/Name'
import { Email } from './VOs/Email'
import { IUser } from './types/IUser'

export class User {
  id: string
  signId: string
  name: Name
  email: Email
  avatar: string
  currency: string
  payMethods: string[]
  sessionActive: boolean
  
  constructor({ id, signId, name, email, avatar, currency, payMethods, sessionActive }: IUser) {
    this.id = id
    this.signId = signId
    this.name = new Name(name)
    this.email = new Email(email)
    this.avatar = avatar
    this.currency = currency
    this.payMethods = payMethods
    this.sessionActive = sessionActive
  }
}
