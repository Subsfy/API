import { Subscription } from 'src/domain/entity/Subscription'
import { ISubscriptionRepository } from './../../../domain/repository/SubscriptionRepository'
export class SubscriptionRepositoryMemory implements ISubscriptionRepository {
  subscriptions: Subscription[]

  constructor() {
    this.subscriptions = []
  }

  async save(subscription: Subscription): Promise<void> {
    this.subscriptions.push(subscription)
  }

  async update(subscription: Subscription): Promise<void> {
    const existsSubscription = await this.get(subscription.user.email.value, subscription.service.name)
    if (!existsSubscription) { throw new Error('Subscription not found') }
    this.subscriptions.findIndex((value, index, array) => value === subscription ? array.splice(index, 1, subscription) : null)
  }

  async get(userId: string, serviceId: string): Promise<Subscription[]> {
    return this.subscriptions.filter(subscription =>
      subscription.user.id === userId && subscription.service.name === serviceId)
  }
}
