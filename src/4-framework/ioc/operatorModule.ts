import { ContainerModule, interfaces } from 'inversify'

import { CreateUserIdentityOperator } from '../../3-controller/operators/users/createUserIdentityOperator'
import { AuthorizerOperator } from '../../3-controller/operators/authorizer/authorizerOperator'
import { SignInOperator } from '../../3-controller/operators/users/signInOperator'


export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserIdentityOperator).toSelf()
  bind(AuthorizerOperator).toSelf()
  bind(SignInOperator).toSelf()
})
