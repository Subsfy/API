import { Service } from '../entity/Service'

export interface IServiceRepository {
  save(service: Service): Promise<void>
  update(service: Service): Promise<void>
  get(serviceId: string): Promise<Service>
}
