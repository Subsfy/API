export interface IAuthAdapter {
  authenticate: (token: string, deviceType: string) => Promise<void>
}
