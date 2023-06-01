import { IsJWT, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'
import { OutputGeneratePolicyDto } from '../../../2-business/dto/authorizer/policyDto'

export class InputAuthorizer extends Validatable<InputAuthorizer> {
  @IsNotEmpty()
  @IsJWT()
  token!: string

  @IsOptional()
  @IsUUID()
  user_id!: string
}

export type OutputAuthorizer = OutputGeneratePolicyDto
