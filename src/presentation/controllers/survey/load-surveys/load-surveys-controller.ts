import { type Controller, type LoadSurveys, type HttpRequest, type HttpResponse } from './load-surveys-controller-protocols'
import { noContent, ok, serverError } from '~/presentation/helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}
