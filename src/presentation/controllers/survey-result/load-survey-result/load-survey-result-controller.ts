import { type Controller, type HttpRequest, type HttpResponse, type LoadSurveyById, type LoadSurveyResult } from './load-survey-result-controller-protocols'
import { forbidden, serverError } from '~/presentation/helpers/http/http-helper'
import { InvalidParamError } from '~/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.loadSurveyResult.load(surveyId)
      return null
    } catch (err) {
      return serverError(err)
    }
  }
}
