import { type LogErrorRepository } from '~/data/protocols/db/log/log-error-repository'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stackError: string): Promise<void> {
      await Promise.resolve(null)
    }
  }

  return new LogErrorRepositoryStub()
}
