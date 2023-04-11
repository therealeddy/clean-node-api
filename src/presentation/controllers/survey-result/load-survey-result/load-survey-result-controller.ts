import { forbidden, serverError } from '~/presentation/helpers/http/http-helper'
import { type Controller, type HttpRequest, type HttpResponse, type LoadSurveyById } from './load-survey-result-controller-protocols'
import { InvalidParamError } from '~/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return await Promise.resolve(null)
    } catch (err) {
      return serverError(err)
    }
  }
}
