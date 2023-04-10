import { type LoadSurveyResultRepository } from '~/data/protocols/db/survey-result/load-survey-result-repository'
import { type LoadSurveyResult } from '~/domain/usecases/survey-result/load-survey-result'
import { type SurveyResultModel } from '~/domain/models/survey-result'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return await Promise.resolve(null)
  }
}
