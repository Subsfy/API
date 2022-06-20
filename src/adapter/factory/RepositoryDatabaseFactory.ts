import { IServiceRepository } from 'src/domain/repository/ServiceRepository'
import { ISubscriptionRepository } from 'src/domain/repository/SubscriptionRepository'
import { IUserRepository } from 'src/domain/repository/UserRepository'
import { ServiceRepositoryDatabase } from '../repository/database/ServiceRepositoryDatabase'
import { SubscriptionRepositoryDatabase } from '../repository/database/SubscriptionRepositoryDatabase'
import { UserRepositoryDatabase } from '../repository/database/UserRepositoryDatabase'
import { IRepositoryAbstractFactory } from './../../domain/factory/RepositoryAbstractFactory'

export class RepositoryDatabaseFactory implements IRepositoryAbstractFactory {
  createUserRepository(): IUserRepository {
    return new UserRepositoryDatabase()
  }
  createServiceRepository(): IServiceRepository {
    return new ServiceRepositoryDatabase()
  }
  createSubscriptionRepository(): ISubscriptionRepository {
    return new SubscriptionRepositoryDatabase()
  }
}
