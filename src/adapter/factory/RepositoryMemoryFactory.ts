import { IServiceRepository } from 'src/domain/repository/ServiceRepository'
import { ISubscriptionRepository } from 'src/domain/repository/SubscriptionRepository'
import { IUserRepository } from 'src/domain/repository/UserRepository'
import { ServiceRepositoryMemory } from '../repository/memory/ServiceRepositoryMemory'
import { SubscriptionRepositoryMemorySingleton } from '../repository/memory/SubscriptionRepositoryMemorySingleton'
import { UserRepositoryMemory } from '../repository/memory/UserRepositoryMemory'
import { IRepositoryAbstractFactory } from './../../domain/factory/RepositoryAbstractFactory'

export class RepositoryMemoryFactory implements IRepositoryAbstractFactory {
  constructor() {
    SubscriptionRepositoryMemorySingleton.destroyInstance()
  }

  createUserRepository(): IUserRepository {
    return new UserRepositoryMemory()
  }
  createServiceRepository(): IServiceRepository {
    return new ServiceRepositoryMemory()
  }
  createSubscriptionRepository(): ISubscriptionRepository {
    return SubscriptionRepositoryMemorySingleton.getInstance()
  }

}
