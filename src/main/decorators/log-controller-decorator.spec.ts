import { LogControllerDecorator } from './log-controller-decorator'
import { type Controller, type HttpResponse } from '~/presentation/protocols'
import { serverError, ok } from '~/presentation/helpers/http/http-helper'
import { type LogErrorRepository } from '~/data/protocols/db/log/log-error-repository'
import { mockAccountModel } from '~/domain/test'
import { mockLogErrorRepository } from '~/data/test'

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'

  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: any): Promise<HttpResponse> {
      return await Promise.resolve(ok(mockAccountModel()))
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepository()

  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle('any_value')
    expect(handleSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle('any_value')
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))

    await sut.handle('any_value')
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
