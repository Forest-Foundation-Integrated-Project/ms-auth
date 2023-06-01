import { IsNotEmpty, IsString } from 'class-validator'

import { ISignResponse } from '../../../2-business/dto/users/signInDto'
import { Either } from '../../../4-framework/shared/either'
import { IError } from '../../../4-framework/shared/iError'
import { Validatable } from '../abstractValidatable'

export class InputSignIn extends Validatable<InputSignIn> {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputSignIn = Either<IError, ISignResponse>
