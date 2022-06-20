import { Subscriptions } from '@prisma/client'
import { Subscription } from '@domain/entity/Subscription'
import { ISubscriptionRepository } from './../../../domain/repository/SubscriptionRepository'
import { prisma } from '@infra/database/prisma'
import { Cycle } from '@domain/entity/enums/Cycle'
import { Duration } from '@domain/entity/enums/Duration'
import { Reminder } from '@domain/entity/enums/Reminder'

export class SubscriptionRepositoryDatabase implements ISubscriptionRepository {
  async save(subscription: Subscription): Promise<void> {
    const newSubscription: Subscriptions = {
      id: undefined,
      createdAt: new Date(),
      currency: subscription.currency,
      cycle: subscription.cycle,
      description: subscription.description,
      duration: subscription.duration,
      payday: subscription.payDay,
      payMethod: subscription.payMethod,
      people: JSON.stringify(subscription.people),
      price: subscription.price,
      reminder: subscription.reminder,
      serviceId: subscription.service.name,
      shared: subscription.shared,
      userId: subscription.user.id,
    }
    await prisma.subscriptions.create({ data: newSubscription })
  }

  async update(subscription: Subscription): Promise<void> {
    const newSubscription: Subscriptions = {
      id: subscription.id,
      createdAt: undefined,
      currency: subscription.currency,
      cycle: subscription.cycle,
      description: subscription.description,
      duration: subscription.duration,
      payday: subscription.payDay,
      payMethod: subscription.payMethod,
      people: JSON.stringify(subscription.people),
      price: subscription.price,
      reminder: subscription.reminder,
      serviceId: subscription.service.name,
      shared: subscription.shared,
      userId: subscription.user.id,
    }
    await prisma.subscriptions.update({
      where: {
        id: subscription.id
      },
      data: newSubscription
    })
  }

  async get(userId: string, serviceId: string): Promise<Subscription[]> {
    const subscriptionsData = await prisma.subscriptions.findMany({
      where: {
        userId,
        serviceId
      }
    })
    if (!subscriptionsData.length) throw new Error('Subscriptions not found')
    const subscriptions: Subscription[] = []
    subscriptionsData.forEach(subscriptionData => {
      const subscription = new Subscription({
        id: subscriptionData.id,
        currency: subscriptionData.currency,
        cycle: Cycle[subscriptionData.cycle],
        description: subscriptionData.description,
        duration: Duration[subscriptionData.duration],
        payDay: subscriptionData.payday,
        payMethod: subscriptionData.payMethod,
        people: JSON.parse(`${subscriptionData.people}`),
        price: subscriptionData.price,
        reminder: Reminder[subscriptionData.reminder],
        shared: subscriptionData.shared,
        service: null,
        user: null,
      })
      subscriptions.push(subscription)
    })
    return subscriptions
  }
}
