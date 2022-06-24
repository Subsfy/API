import { Subscription } from '../entity/Subscription'

export interface ISubscriptionRepository {
  save(subscription: Subscription): Promise<void>
  update(subscription: Subscription): Promise<void>
  get(userId: string, serviceId: string): Promise<Subscription[]>
}
