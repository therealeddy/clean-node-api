import { anauthorized, badRequest, ok, serverError } from '~/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '~/presentation/protocols'
import { type Authentication } from '~/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = request
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

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
