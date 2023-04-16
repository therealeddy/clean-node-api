import { noContent, ok, serverError } from '~/presentation/helpers'
import { type Controller, type HttpResponse } from '~/presentation/protocols'
import { type LoadSurveys } from '~/domain/usecases'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: LoadSurveysController.Request): Promise <HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
