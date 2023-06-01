import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { httpCodes, httpResponse } from './httpResponse';
import { Either, Left, Right } from '../shared/either';
import { IError } from '../shared/iError';


export const httpHandler = (
  handler: (event: APIGatewayProxyEvent, context: Context) => Promise<Either<IError, any> | APIGatewayProxyResult>,
  options?: {
    statusCode?: { success?: httpCodes; fail?: httpCodes }
  }
) => {
  return async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {
      const result = await handler(event, context)

      if (result instanceof Left) {
        if (options?.statusCode?.fail) {
          return httpResponse.call(options?.statusCode?.fail, result.value)
        }
        return httpResponse.badRequest(result.value)
      }

      if (result instanceof Right) {
        if (options?.statusCode?.success) {
          return httpResponse.call(options?.statusCode?.success, result.value)
        }
        return httpResponse.ok(result.value)
      }

      return result
    } catch (error) {
      if (error && error.shortMessage === 'validationError') {
        return httpResponse.badRequest(error)
      }
      return httpResponse.internalServerError()
    }
  }
}
