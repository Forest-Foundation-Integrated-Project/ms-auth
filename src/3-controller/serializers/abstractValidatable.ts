import { validateSync } from 'class-validator'

export abstract class Validatable<A> {
  constructor(obj: Partial<A>) {
    Object.assign(this, obj)
  }

  errors() {
    return validateSync(this)
  }

  isValid() {
    const errors = this.errors()
    return !errors || errors.length === 0
  }

  validate() {
    const errors = this.errors()
    if (errors && errors.length > 0) {
      throw errors
    }
  }
}
