interface IPeople {
  name: string
  email: string
}

export class People {
  name: string
  email: string

  constructor({ name, email }: IPeople) {
    this.name = name
    this.email = email
  }
}
