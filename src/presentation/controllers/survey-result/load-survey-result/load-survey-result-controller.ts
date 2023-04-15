import { type Controller, type HttpResponse, type CheckSurveyById, type LoadSurveyResult } from './load-survey-result-controller-protocols'
import { forbidden, serverError, ok } from '~/presentation/helpers/http/http-helper'
import { InvalidParamError } from '~/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId } = request
      const exists = await this.checkSurveyById.checkById(surveyId)
      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, request.accountId)
      return ok(surveyResult)
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
