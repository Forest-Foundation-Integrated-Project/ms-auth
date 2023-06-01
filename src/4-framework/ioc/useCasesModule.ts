import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityUseCase } from '../../2-business/useCases/users/createUserIdentityUseCase'
import { GeneratePolicyUserCase } from '../../2-business/useCases/authorizer/generatePolicyUseCase'
import { AuthorizerUseCase } from '../../2-business/useCases/authorizer/authorizerUseCase'
import { SignInUseCase } from '../../2-business/useCases/users/signInUseCase'


export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityUseCase).toSelf()
  bind(AuthorizerUseCase).toSelf()
  bind(GeneratePolicyUserCase).toSelf()
  bind(SignInUseCase).toSelf()
})
