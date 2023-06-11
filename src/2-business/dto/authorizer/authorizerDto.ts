import { Either } from "../../../4-framework/shared/either"
import { IError } from "../../../4-framework/shared/iError"

export interface InputAuthorizerDto {
  token: string,
  user_id?: string
}

export interface AuthorizerDto {
  username: string,
  userId: string,
}

export type OutputAuthorizerDto = Either<IError, AuthorizerDto>
