import 'reflect-metadata'
import '../../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { SignInOperator } from '../../../3-controller/operators/users/signInOperator'
import { InputSignIn } from '../../../3-controller/serializers/users/inputSignIn'
import { httpResponse } from '../../utility/httpResponse'
import { httpHandler } from '../../utility/httpHandler'
import { container } from '../../shared/ioc/container'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(SignInOperator)
  const body = JSON.parse(event?.body as string)
  const input = new InputSignIn(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})
