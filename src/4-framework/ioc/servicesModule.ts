import { ContainerModule, interfaces } from 'inversify'
import { IIdentityService, IIdentityServiceToken } from '../../2-business/services/iIdentityService'
import { IdentityService } from '../services/identityService'

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IIdentityService>(IIdentityServiceToken).to(IdentityService)
})
