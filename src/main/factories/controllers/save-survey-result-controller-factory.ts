import { type Controller } from '~/presentation/protocols'
import { SaveSurveyResultController } from '~/presentation/controllers'
import { makeLogControllerDecorator, makeDbSaveSurveyResult, makeDbLoadAnswersBySurvey } from '~/main/factories'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
