import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey'
import { type AddSurvey } from '../../../../domain/usecases/add-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/servey/survey-mongo-repository'

export const makeDbSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
