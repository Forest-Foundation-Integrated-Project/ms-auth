import { Either } from "../../../4-framework/shared/either"
import { IError } from "../../../4-framework/shared/iError"

export interface InputSignInDto {
  email: string
  password: string
}

export interface ISignResponse {
  token: string
  refreshToken: string
  expiresIn: number
  user_id?: string
}

export type OutputSignInDto = Either<IError, ISignResponse>
