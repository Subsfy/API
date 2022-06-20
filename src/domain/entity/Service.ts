import { ServiceType } from './enums/ServiceType'
import { IService } from './types/IService'

export class Service {
  id: string
  name: string
  logo: string
  type: ServiceType
  color: string
  defaultService: boolean
  
  constructor({ id, name, logo, type, color, defaultService }: IService) {
    this.id = id
    this.name = name
    this.logo = logo
    this.type = type
    this.color = color
    this.defaultService = defaultService
  }
}
