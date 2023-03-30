import { MongoHelper } from '../helpers/mongo-helper'
import { type SurveyModel } from '~/domain/models/survey'
import { type AddSurveyModel } from '~/domain/usecases/add-survey'
import { type LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository'
import { type AddSurveyRepository } from '~/data/usecases/add-survey/db-add-survey-protocols'
import { type LoadSurveyByIdRepository } from '~/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.parseToObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
