import { OperatorModule } from './operatorModule'
import { UseCasesModule } from './useCasesModule'

import { container } from '../shared/ioc/container'
import { ServicesModule } from './servicesModule'

container.load(UseCasesModule)
container.load(OperatorModule)
container.load(ServicesModule)
