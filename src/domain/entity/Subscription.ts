import { User } from './User'
import { Service } from './Service'
import { Reminder } from './enums/Reminder'
import { Duration } from './enums/Duration'
import { Cycle } from './enums/Cycle'
import { People } from './VOs/People'
import { ISubscription } from './types/ISubscription'

export class Subscription {
  id: string
  user: User
  service: Service
  description: string
  price: number
  payMethod: string
  payDay: Date
  cycle: Cycle
  duration: Duration
  reminder: Reminder
  currency: string
  shared: boolean
  people: People[]
  
  constructor({
    id,
    user,
    service,
    description,
    price,
    payMethod,
    payDay,
    cycle,
    duration,
    reminder,
    currency,
    shared,
    people
  }: ISubscription) {
    this.id = id
    this.user = user
    this.service = service
    this.description = description
    this.price = price
    this.payMethod = payMethod
    this.payDay = payDay
    this.cycle = cycle
    this.duration = duration
    this.reminder = reminder
    this.currency = currency
    this.shared = shared
    this.people = people
  }
}
