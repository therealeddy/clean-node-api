import { makeAddSurveyValidation } from './add-survey-validation-factory'

import { makeLogControllerDecorator, makeDbSurvey } from '~/main/factories'

import { type Controller } from '~/presentation/protocols'
import { AddSurveyController } from '~/presentation/controllers'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbSurvey())
  return makeLogControllerDecorator(controller)
}
