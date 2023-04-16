import { type AddSurvey } from '~/domain/usecases'
import { DbAddSurvey } from '~/data/usecases'

import { SurveyMongoRepository } from '~/infra/db'

export const makeDbSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
