import { IServiceRepository } from '../repository/ServiceRepository'
import { ISubscriptionRepository } from '../repository/SubscriptionRepository'
import { IUserRepository } from '../repository/UserRepository'

export interface IRepositoryAbstractFactory {
  createUserRepository(): IUserRepository
  createServiceRepository(): IServiceRepository
  createSubscriptionRepository(): ISubscriptionRepository
}
