import { MongoHelper, SurveyResultMongoRepository } from '~/infra/db'

import { type SurveyModel } from '~/domain/models'

import { type Collection } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer_1'
    }, {
      answer: 'any_answer_2'
    }, {
      answer: 'any_answer_3'
    }],
    date: new Date()
  })

  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

const makeAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password'
  })

  return res.insertedId.toHexString()
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    surveyResultCollection = MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})

    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccountId()

      const sut = makeSut()

      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(accountId)
      })

      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its new', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccountId()

      await surveyResultCollection.insertOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()

      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId)
        }).toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccountId()
      const accountId2 = await makeAccountId()

      await surveyResultCollection.insertMany([
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId2),
          answer: survey.answers[0].answer,
          date: new Date()
        }
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(MongoHelper.parseToObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load survey result 2', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccountId()
      const accountId2 = await makeAccountId()
      const accountId3 = await makeAccountId()

      await surveyResultCollection.insertMany([
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId2),
          answer: survey.answers[1].answer,
          date: new Date()
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId3),
          answer: survey.answers[1].answer,
          date: new Date()
        }
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId2)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(MongoHelper.parseToObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load survey result 3', async () => {
      const survey = await makeSurvey()
      const accountId = await makeAccountId()
      const accountId2 = await makeAccountId()
      const accountId3 = await makeAccountId()

      await surveyResultCollection.insertMany([
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId),
          answer: survey.answers[0].answer,
          date: new Date()
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(accountId2),
          answer: survey.answers[1].answer,
          date: new Date()
        }
      ])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId3)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(MongoHelper.parseToObjectId(survey.id))
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should return null if there is no survey result', async () => {
      const accountId = await makeAccountId()
      const survey = await makeSurvey()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeNull()
    })
  })
})
