import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { SignInUseCase } from '../../../2-business/useCases/users/signInUseCase'
import { InputSignIn, OutputSignIn } from '../../serializers/users/inputSignIn'
import { left, right } from '../../../4-framework/shared/either'

@injectable()
export class SignInOperator extends AbstractOperator<InputSignIn, OutputSignIn> {
  public constructor(@inject(SignInUseCase) private signInUseCase: SignInUseCase) {
    super()
  }

  protected async run(input: InputSignIn): Promise<OutputSignIn> {
    const result = await this.signInUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
