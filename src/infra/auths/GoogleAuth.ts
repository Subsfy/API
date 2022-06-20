import { OAuth2Client } from 'google-auth-library'
import { IAuthAdapter } from './../../adapter/auth/authAdapter'

export class GoogleAuth implements IAuthAdapter {
  token: string
  deviceType: string
  signId: string
  name: string
  email: string
  avatar: string

  constructor(token: string, deviceType: string) {
    this.token = token
    this.deviceType = deviceType
  }

  async authenticate() {
    const clientId = this.deviceType === 'android'
      ? process.env.ANDROID_CLIENT_ID : process.env.IOS_CLIENT_ID
    const client = new OAuth2Client(clientId)
    const ticket = await client.verifyIdToken({ idToken: this.token })
    const payload = ticket.getPayload()
    if (!payload) throw new Error('Invalid token')
    const { sub, name, email, picture } = payload
    this.signId = sub
    this.name = name
    this.email = email
    this.avatar = picture
  }
}
