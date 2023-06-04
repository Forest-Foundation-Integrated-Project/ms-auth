import 'reflect-metadata'
import '../../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { CreateUserIdentityOperator } from '../../../3-controller/operators/users/createUserIdentityOperator'
import { InputCreateUserIdentity } from '../../../3-controller/serializers/users/inputCreateUserIdentity'
import { httpHandler } from '../../utility/httpHandler'
import { container } from '../../shared/ioc/container'
import { httpResponse } from '../../utility/httpResponse'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('entrou => ', event)
  const operator = container.get(CreateUserIdentityOperator)
  const body = JSON.parse(event?.body as string)
  console.log('entrou body => ', body)

  const input = new InputCreateUserIdentity(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})
