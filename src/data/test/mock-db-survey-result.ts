import { type SaveSurveyResultRepository } from '~/data/protocols/db/survey-result/save-survey-result-repository'
import { type SurveyResultModel } from '~/domain/models/survey-result'
import { type SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result'
import { mockSurveyResultModel } from '~/domain/test'
import { type LoadSurveyResultRepository } from '~/data/protocols/db/survey-result/load-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}
