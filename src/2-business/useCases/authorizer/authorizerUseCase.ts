import { injectable, inject } from 'inversify'

import { InputAuthorizerDto, OutputAuthorizerDto } from '../../dto/authorizer/authorizerDto'
import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { UserCredentialsDoNotMatch } from '../../module/errors/userIdentityErrors'
import { left, right } from '../../../4-framework/shared/either'
import { IUseCase } from '../iUseCase'
import { UserIdentityIsNotValid } from '../../module/errors/authorizerErrors'

@injectable()
export class AuthorizerUseCase implements IUseCase<InputAuthorizerDto, OutputAuthorizerDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) { }

  async exec(input: InputAuthorizerDto): Promise<OutputAuthorizerDto> {
    try {
      const consultUserResponse = await this.identityService.consultUser(input.token)
      console.log('CreateUserIdentityUseCase::consultUserResponse => ', consultUserResponse.value)

      if (consultUserResponse.isLeft()) {
        return left(UserIdentityIsNotValid)
      }

      if (input.user_id && input.user_id !== consultUserResponse.value.userId) {
        return left(UserCredentialsDoNotMatch)
      }

      return right(consultUserResponse.value)
    } catch (error) {
      console.log('AuthorizerUseCase::error => ', error)
      return left(UserIdentityIsNotValid)
    }
  }
}
