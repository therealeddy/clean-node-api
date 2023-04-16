import { makeSignUpValidation } from './signup-validation-factory'

import { SignUpController } from '~/presentation/controllers'
import { type Controller } from '~/presentation/protocols'

import { makeDbAuthentication, makeDbAddAccount, makeLogControllerDecorator } from '~/main/factories'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
