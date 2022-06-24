import { ServiceType } from '../enums/ServiceType'

export interface IService {
  id: string
  name: string
  logo: string
  type: ServiceType
  color?: string
  defaultService: boolean
}
