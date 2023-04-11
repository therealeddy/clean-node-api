import { type HttpRequest, type HttpResponse, type Controller, type Validation, type Authentication } from './login-controller-protocols'
import { anauthorized, badRequest, ok, serverError } from '~/presentation/helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const authenticationModel = await this.authentication.auth({ email, password })

      if (!authenticationModel) {
        return anauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
