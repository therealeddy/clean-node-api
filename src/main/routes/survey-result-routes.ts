import { makeSaveSurveyResultController } from '~/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { type Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
