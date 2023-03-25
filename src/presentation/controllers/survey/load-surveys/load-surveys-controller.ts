import { type Controller } from '../../../protocols'
import { type LoadSurveys, type HttpRequest, type HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise <HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
