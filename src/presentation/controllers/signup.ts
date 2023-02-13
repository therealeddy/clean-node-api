import { type HttpResponse, type HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const filed of requiredFields) {
      if (!httpRequest.body[filed]) {
        return badRequest(new MissingParamError(filed))
      }
    }
  }
}
