import { MongoHelper, SurveyMongoRepository } from '~/infra/db'

import FakeObjectId from 'bson-objectid'
import { type Collection } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password'
  })

  return res.insertedId.toHexString()
}

describe('Survey Mongo Repository', () => {
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

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })

      const survey = await surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const accountId = await mockAccountId()

      const result = await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      }, {
        question: 'other_question',
        answers: [{
          image: 'other_image',
          answer: 'other_answer'
        }],
        date: new Date()
      }])

      const survey = await surveyCollection.findOne({ _id: result.insertedIds[0] })

      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: MongoHelper.parseToObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)

      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe('other_question')
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      const sut = makeSut()
      const survey = await sut.loadById(res.insertedId.toHexString())
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    test('Should return null if survey does not exists', async () => {
      const sut = makeSut()
      const survey = await sut.loadById(new FakeObjectId().toHexString())
      expect(survey).toBeFalsy()
    })
  })

  describe('loadAnswers()', () => {
    test('Should load answers on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          image: 'any_image',
          answer: 'any_answer_2'
        }],
        date: new Date()
      })

      const sut = makeSut()
      const answers = await sut.loadAnswers(res.insertedId.toHexString())
      expect(answers).toEqual(['any_answer', 'any_answer_2'])
    })

    test('Should return empty array if survey does not exists', async () => {
      const sut = makeSut()
      const answers = await sut.loadAnswers(new FakeObjectId().toHexString())
      expect(answers).toEqual([])
    })
  })

  describe('checkById()', () => {
    test('Should return true if survey exists', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      const sut = makeSut()
      const exists = await sut.checkById(res.insertedId.toHexString())
      expect(exists).toBe(true)
    })

    test('Should return false if survey not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(new FakeObjectId().toHexString())
      expect(exists).toBe(false)
    })
  })
})
