import { makeLoginValidation } from './login-validation-factory'

import { type Controller } from '~/presentation/protocols'
import { LoginController } from '~/presentation/controllers'
import { makeDbAuthentication, makeLogControllerDecorator } from '~/main/factories'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
