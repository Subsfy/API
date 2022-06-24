import { Service } from 'src/domain/entity/Service'
import { IServiceRepository } from './../../../domain/repository/ServiceRepository'
export class ServiceRepositoryMemory implements IServiceRepository {
  services: Service[]

  constructor() {
    this.services = []
  }

  async save(service: Service): Promise<void> {
    this.services.push(service)
  }

  async update(service: Service): Promise<void> {
    const existsService = await this.get(service.name)
    if (!existsService) { throw new Error('Service not found') }
    this.services.findIndex((value, index, array) => value === service ? array.splice(index, 1, service) : null)
  }

  async get(serviceId: string): Promise<Service> {
    return this.services.find(service => service.id === serviceId)
  }
}
