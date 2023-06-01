import { Either } from "../../../4-framework/shared/either"
import { IError } from "../../../4-framework/shared/iError"

export interface InputCreateUserIdentityDto {
  email: string
  password: string
  user_id: string
  name: string
}

export interface ICreateUserIdentityResponseDto {
  email: string
  enabled: boolean
}

export type OutputCreateUserIdentityDto = Either<IError, ICreateUserIdentityResponseDto>
