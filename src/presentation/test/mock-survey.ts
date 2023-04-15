import { type SurveyModel } from '~/domain/models/survey'
import { type AddSurvey } from '~/domain/usecases/survey/add-survey'
import { type LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id'
import { type CheckSurveyById } from '~/domain/usecases/survey/check-survey-by-id'
import { type LoadSurveys } from '~/domain/usecases/survey/load-surveys'
import { mockSurveyModel, mockSurveyModels } from '~/domain/test'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      await Promise.resolve(null)
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  return new LoadSurveyByIdStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<CheckSurveyById.Result> {
      return await Promise.resolve(true)
    }
  }

  return new CheckSurveyByIdStub()
}
