import { type SaveSurveyResult, type Controller, type HttpResponse, type LoadAnswersBySurvey } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '~/presentation/errors'
import { forbidden, serverError, ok } from '~/presentation/helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request

      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)

      if (!answers.length) {
        return forbidden(new InvalidParamError('surveyId'))
      } else if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
    answer: string
  }
}
