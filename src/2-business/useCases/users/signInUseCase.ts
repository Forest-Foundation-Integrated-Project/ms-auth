import { injectable, inject } from 'inversify'

import { left, right } from '../../../4-framework/shared/either'
import { FailedToSignIn } from '../../module/errors/userIdentityErrors'
import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { InputSignInDto, OutputSignInDto } from '../../dto/users/signInDto'
import { IUseCase } from '../iUseCase'

@injectable()
export class SignInUseCase implements IUseCase<InputSignInDto, OutputSignInDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) {}

  async exec(input: InputSignInDto): Promise<OutputSignInDto> {
    try {
      console.log('SignInUseCase::input => ', input)

      const signInResponse = await this.identityService.auth(input)

      if (signInResponse.isLeft()) {
        return left(FailedToSignIn)
      }

      return right(signInResponse.value)
    } catch (error) {
      console.log('SignInUseCase::error => ', error)
      return left(FailedToSignIn)
    }
  }
}
