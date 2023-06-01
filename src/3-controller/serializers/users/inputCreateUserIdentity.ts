import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { Either } from '../../../4-framework/shared/either'
import { IError } from '../../../4-framework/shared/iError'
import { Validatable } from '../abstractValidatable'
import { ICreateUserIdentityResponseDto } from '../../../2-business/dto/users/createUserIdentityDto'

export class InputCreateUserIdentity extends Validatable<InputCreateUserIdentity> {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsUUID()
  user_id!: string

  @IsNotEmpty()
  @IsString()
  name!: string
}

export type OutputCreateUserIdentity = Either<IError, ICreateUserIdentityResponseDto>
