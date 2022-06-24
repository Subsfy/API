import { User } from '../User'
import { Service } from '../Service'
import { Cycle } from '../enums/Cycle'
import { Duration } from '../enums/Duration'
import { Reminder } from '../enums/Reminder'
import { People } from '../VOs/People'

export interface ISubscription {
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
}
