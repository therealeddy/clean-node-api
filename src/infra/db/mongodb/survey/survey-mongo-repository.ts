import { MongoHelper } from '../helpers/mongo-helper'
import { type SurveyModel } from '~/domain/models/survey'
import { type LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository'
import { type AddSurveyRepository } from '~/data/protocols/db/survey/add-survey-repository'
import { type LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository'
import { type CheckSurveyByIdRepository } from '~/data/protocols/db/survey/check-survey-by-id-repository'
import { QueryBuilder } from '../helpers'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository {
  async add (surveyData: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', MongoHelper.parseToObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()

    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.parseToObjectId(id) })
    return survey && MongoHelper.map(survey)
  }

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({
      _id: MongoHelper.parseToObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return survey !== null
  }
}
