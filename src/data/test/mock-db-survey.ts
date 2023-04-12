import { type AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository'
import { type LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository'
import { type LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository'

import { type SurveyModel } from '~/domain/models/survey'
import { type AddSurveyParams } from '~/domain/usecases/survey/add-survey'

import { mockSurveyModel, mockSurveyModels } from '~/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      await Promise.resolve(null)
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
