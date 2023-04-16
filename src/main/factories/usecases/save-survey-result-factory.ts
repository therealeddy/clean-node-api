import { SurveyResultMongoRepository } from '~/infra/db'
import { type SaveSurveyResult } from '~/domain/usecases'
import { DbSaveSurveyResult } from '~/data/usecases'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
