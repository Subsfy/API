import nodemailer from 'nodemailer'
import { IMailAdapter, ISendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f13f6ed34406b0',
    pass: '4671b13859ff1a'
  }
})

export class NodemailMailAdapter implements IMailAdapter {
  async sendMail({ to, subject, body }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Subsfy <contato@subsfy.com>',
      to,
      subject,
      html: body,
    })
  }
}
