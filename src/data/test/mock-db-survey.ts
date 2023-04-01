import { type AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository'
import { type LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository'
import { type LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository'
import { type SaveSurveyResultRepository } from '~/data/protocols/db/survey-result/save-survey-result-repository'

import { type SurveyModel } from '~/domain/models/survey'
import { type SurveyResultModel } from '~/domain/models/survey-result'
import { type AddSurveyParams } from '~/domain/usecases/survey/add-survey'
import { type SaveSurveyResultParams } from '~/domain/usecases/survey-result/save-survey-result'

import { mockSurveyModel, mockSurveyModels, mockSurveyResultModel } from '~/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurveyModel()) })
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(mockSurveyModels()) })
    }
  }

  return new LoadSurveysRepositoryStub()
}

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => { resolve(mockSurveyResultModel()) })
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
