import { ISubscriptionRepository } from './../../../domain/repository/SubscriptionRepository'
import { SubscriptionRepositoryMemory } from './SubscriptionRepositoryMemory'
export class SubscriptionRepositoryMemorySingleton {
  static instance: ISubscriptionRepository | undefined

  static getInstance(): ISubscriptionRepository {
    if (!SubscriptionRepositoryMemorySingleton.instance) {
      SubscriptionRepositoryMemorySingleton.instance = new SubscriptionRepositoryMemory()
    }
    return SubscriptionRepositoryMemorySingleton.instance
  }

  static destroyInstance(): void {
    SubscriptionRepositoryMemorySingleton.instance = undefined
  }
}
