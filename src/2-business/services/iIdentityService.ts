import { AuthorizerDto } from "../dto/authorizer/authorizerDto"
import { ICreateUserIdentityResponseDto } from "../dto/users/createUserIdentityDto"
import { ISignResponse, InputSignInDto } from "../dto/users/signInDto"
import { Either } from "../../4-framework/shared/either"
import { IError } from "../../4-framework/shared/iError"

export const IIdentityServiceToken = Symbol.for('IIdentityService')

export type IDataIdentityService = {
  email: string
  password: string
  user_id: string
  name: string
}


export interface IIdentityService {
  create(data: IDataIdentityService): Promise<Either<IError, ICreateUserIdentityResponseDto>>
  auth(data: InputSignInDto): Promise<Either<IError, ISignResponse>>
  consultUser(token: string): Promise<Either<IError, AuthorizerDto>>
}
