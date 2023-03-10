import { badRequest } from '../../../helpers/http/http-helper'
import { type Validation, type Controller, type HttpRequest, type HttpResponse } from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    return await new Promise(resolve => { resolve(null) })
  }
}
