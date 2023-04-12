import { type Controller, type LoadSurveys, type HttpResponse } from './load-surveys-controller-protocols'
import { noContent, ok, serverError } from '~/presentation/helpers/http/http-helper'

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
