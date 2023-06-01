import { injectable, inject } from 'inversify'

import { left, right } from '../../../4-framework/shared/either'
import { UserIdentityEntity } from '../../../1-domain/entities/userIdentityEntity'
import { InputCreateUserIdentityDto, OutputCreateUserIdentityDto } from '../../dto/users/createUserIdentityDto'
import { UserIdentityCreationFailed } from '../../module/errors/userIdentityErrors'
import { IIdentityService, IIdentityServiceToken } from '../../services/iIdentityService'
import { IUseCase } from '../iUseCase'

@injectable()
export class CreateUserIdentityUseCase implements IUseCase<InputCreateUserIdentityDto, OutputCreateUserIdentityDto> {
  public constructor(@inject(IIdentityServiceToken) private identityService: IIdentityService) {}

  async exec(input: InputCreateUserIdentityDto): Promise<OutputCreateUserIdentityDto> {
    try {
      console.log('CreateUserIdentityUseCase::input => ', input)
      const userIdentityResult = UserIdentityEntity.create(input)

      if (userIdentityResult.isLeft()) {
        return left(UserIdentityCreationFailed)
      }

      const user = await this.identityService.create(userIdentityResult.value.export())

      if (user.isLeft()) {
        return left(UserIdentityCreationFailed)
      }

      return right(user.value)
    } catch (error) {
      console.log('CreateUserIdentityUseCase::error => ', error)
      return left(UserIdentityCreationFailed)
    }
  }
}
