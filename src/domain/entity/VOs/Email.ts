export class Email {
  value: string

  constructor(value: string) {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) throw new Error('Invalid email')
    this.value = value
  }
}
