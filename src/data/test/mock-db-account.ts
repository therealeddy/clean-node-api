import { type AddAccountRepository } from '~/data/protocols/db/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '~/data/protocols/db/account/load-account-by-email-repository'
import { type CheckAccountByEmailRepository } from '~/data/protocols/db/account/check-account-by-email-repository'
import { type LoadAccountByTokenRepository } from '~/data/protocols/db/account/load-account-by-token-repository'
import { type UpdateAccessTokenRepository } from '~/data/protocols/db/account/update-access-token-repository'

import { mockAccountModel } from '~/domain/test'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
      return await Promise.resolve(true)
    }
  }

  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockCheckAccountByEmailRepository = (): CheckAccountByEmailRepository => {
  class CheckAccountByEmailRepositoryStub implements CheckAccountByEmailRepository {
    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
      return await Promise.resolve(false)
    }
  }

  return new CheckAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
