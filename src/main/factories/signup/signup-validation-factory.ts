import { RequiredFieldValidation, ValidationComposite, CompareFieldsValidation } from '../../../presentation/helpers/validatiors'
import { type Validation } from '../../../presentation/protocols/validation'
import { EmailValidation } from '../../../presentation/helpers/validatiors/email-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
