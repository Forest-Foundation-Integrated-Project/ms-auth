interface IValidationError {
  code: string
  message: string
  shortMessage: string
  details?: Object
}

export const validationError = (details: Object): IValidationError => {
  return {
    code: 'val-001',
    message: 'Validation Error',
    shortMessage: 'validationError',
    details,
  }
}
