import { type Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { anauthorized, badRequest, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const filed of requiredFields) {
        if (!httpRequest.body[filed]) {
          return badRequest(new MissingParamError(filed))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return anauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
