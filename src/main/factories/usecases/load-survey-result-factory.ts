import { SurveyResultMongoRepository, SurveyMongoRepository } from '~/infra/db'
import { type LoadSurveyResult } from '~/domain/usecases'
import { DbLoadSurveyResult } from '~/data/usecases'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
