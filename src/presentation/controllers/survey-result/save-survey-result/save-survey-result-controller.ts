import { type LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden } from '~/presentation/helpers/http/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return null
  }
}
