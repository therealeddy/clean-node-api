import { type AddSurveyRepository, type LoadSurveyByIdRepository, type LoadAnswersBySurveyRepository, type CheckSurveyByIdRepository, type LoadSurveysRepository } from '~/data/protocols'

import { type SurveyModel } from '~/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '~/tests/domain/mocks'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
      await Promise.resolve(null)
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadAnswersBySurveyRepository = (): LoadAnswersBySurveyRepository => {
  class LoadAnswersBySurveyRepositoryStub implements LoadAnswersBySurveyRepository {
    async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
      return await Promise.resolve(['any_answer', 'any_answer_2'])
    }
  }

  return new LoadAnswersBySurveyRepositoryStub()
}

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
  class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
    async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
      return await Promise.resolve(true)
    }
  }

  return new CheckSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysRepositoryStub()
}
