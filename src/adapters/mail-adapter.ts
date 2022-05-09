export interface ISendMailData {
  to: string;
  subject: string;
  body: string;
}

export interface IMailAdapter {
  sendMail: (data: ISendMailData) => Promise<void>
}
