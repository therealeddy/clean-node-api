import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../validation/validatiors'
import { type Validation } from '../../../../presentation/protocols/validation'
import { type EmailValidator } from '../../../../validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../validation/validatiors/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
