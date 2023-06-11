import { injectable } from 'inversify'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

import { IDataIdentityService, IIdentityService } from '../../2-business/services/iIdentityService'
import { ICreateUserIdentityResponseDto } from '../../2-business/dto/users/createUserIdentityDto'
import { AuthorizerDto } from '../../2-business/dto/authorizer/authorizerDto'
import { ISignResponse, InputSignInDto } from '../../2-business/dto/users/signInDto'
import { Either, left, right } from '../shared/either'
import { IError } from '../shared/iError'
import { SignInServiceFailed, UserAuthFailed, UserIdentityCreationFailed, UserNotFound } from '../../2-business/module/errors/userIdentityErrors'

@injectable()
export class IdentityService implements IIdentityService {
  private readonly cognito!: CognitoIdentityServiceProvider

  constructor() {
    this.cognito = new CognitoIdentityServiceProvider()
  }

  async create(data: IDataIdentityService): Promise<Either<IError, ICreateUserIdentityResponseDto>> {
    try {
      const { user_pool_id } = process.env
      const params = {
        UserPoolId: user_pool_id!,
        Username: data.email,
        UserAttributes: [
          { Name: 'email', Value: data.email, },
          { Name: 'email_verified', Value: 'true' },
          { Name: 'custom:user_id', Value: data.user_id },
          { Name: 'name', Value: data.name },
        ],
        MessageAction: 'SUPPRESS'
      }

      console.log('params ', params)

      const response = await this.cognito.adminCreateUser(params).promise()
      console.log('response ', response?.User)

      if (response.User) {
        const paramsForSetPass = {
          Password: data.password,
          UserPoolId: user_pool_id!,
          Username: data.email,
          Permanent: true
        }

        await this.cognito.adminSetUserPassword(paramsForSetPass).promise()
      }

      const user = {
        email: response.User?.Username || '',
        enabled: response.User?.Enabled || false
      }

      return right(user)
    } catch (error) {
      console.log('deu ruim ', error)
      return left(UserIdentityCreationFailed)
    }
  }

  async auth(data: InputSignInDto): Promise<Either<IError, ISignResponse>> {
    try {
      const { user_pool_id, client_id } = process.env
      const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: user_pool_id!,
        ClientId: client_id!,
        AuthParameters: {
          USERNAME: data.email,
          PASSWORD: data.password
        }
      }

      const response = await this.cognito.adminInitiateAuth(params).promise()

      console.log('response data ', response)
      if (!response.AuthenticationResult?.AccessToken) {
        return left(SignInServiceFailed)
      }

      return right({
        token: response.AuthenticationResult?.AccessToken!,
        refreshToken: response.AuthenticationResult?.RefreshToken!,
        expiresIn: response.AuthenticationResult?.ExpiresIn!
      })
    } catch (error) {
      console.log('deu ruim ', error)

      return left(SignInServiceFailed)
    }
  }

  async consultUser(token: string): Promise<Either<IError, AuthorizerDto>> {
    try {
      const response = await this.cognito.getUser({ AccessToken: token }).promise()
      const userId = response
        .UserAttributes
        .find(item => item.Name === 'custom:user_id')?.Value

      if (!userId) {
        return left(UserNotFound)
      }

      return right({
        username: response.Username,
        userId,
      })
    } catch (error) {
      console.log('ConsultUser::error => ', error)

      return left(UserAuthFailed)
    }
  }
}
