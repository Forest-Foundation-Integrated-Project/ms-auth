import { Either, right } from '../../4-framework/shared/either'
import { IError } from '../../4-framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IUserIdentityEntity {
  email: string
  password: string
  user_id: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserIdentityEntity extends AbstractEntity<IUserIdentityEntity> {
  static create(props: IUserIdentityEntity): Either<IError, UserIdentityEntity> {
    const user = new UserIdentityEntity({
      ...props,
    })

    return right(user)
  }
}
