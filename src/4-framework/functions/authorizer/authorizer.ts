import 'reflect-metadata'
import '../../ioc/inversify.config'
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda'

import { container } from '../../shared/ioc/container'
import { InputAuthorizer } from '../../../3-controller/serializers/authorizer/inputAuthorizer'
import { AuthorizerOperator } from '../../../3-controller/operators/authorizer/authorizerOperator'

export const handler = async (event: APIGatewayProxyEvent, _: Context, callback: Callback) => {
  try {
    const operator = container.get(AuthorizerOperator)
    const input = new InputAuthorizer({
      token: event.headers['Authorization']?.split(' ')[1],
      user_id: event.headers['user_id'],
    })

    const response = await operator.exec(input)

    if (response.isLeft()) {
      throw new Error('Unauthorized')
    }
    console.log('responses => ', JSON.stringify(response.value))

    return callback(null, response.value)
  } catch (error) {
    console.log('deu ruim => ', error)
    throw new Error('Unauthorized')
  }
}
