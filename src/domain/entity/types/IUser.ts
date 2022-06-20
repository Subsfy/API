export interface IUser {
  id?: string
  signId: string
  name: string
  email: string
  avatar: string
  currency: string
  payMethods: string[]
  sessionActive: boolean
}
