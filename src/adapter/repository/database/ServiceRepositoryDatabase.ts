import { ServiceType } from '@domain/entity/enums/ServiceType'
import { Service } from '@domain/entity/Service'
import { IServiceRepository } from '@domain/repository/ServiceRepository'
import { prisma } from '@infra/database/prisma'
import { Services } from '@prisma/client'

export class ServiceRepositoryDatabase implements IServiceRepository {
  async save(service: Service): Promise<void> {
    const newService: Services = {
      id: undefined,
      name: service.name,
      type: service.type,
      color: service.color,
      default: service.defaultService,
      logo: service.logo,
    }
    await prisma.services.create({ data: newService })
  }

  async update(service: Service): Promise<void> {
    const newService: Services = {
      id: service.id,
      name: service.name,
      type: service.type,
      color: service.color,
      default: service.defaultService,
      logo: service.logo,
    }
    await prisma.services.update({
      where: {
        id: service.id
      },
      data: newService
    })
  }

  async get(serviceId: string): Promise<Service> {
    const serviceData = await prisma.services.findFirst({
      where: {
        id: serviceId
      }
    })
    if (!serviceData) throw new Error('Service not found')
    return new Service({
      id: serviceData.id,
      defaultService: serviceData.default,
      logo: serviceData.logo,
      name: serviceData.name,
      type: ServiceType[serviceData.type],
      color: serviceData.color,
    })
  }
}
