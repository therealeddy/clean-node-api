import { type AddAccount } from '~/domain/usecases/account/add-account'
import { type Authentication, type AuthenticationParams } from '~/domain/usecases/account/authentication'
import { type LoadAccountByToken } from '~/domain/usecases/account/load-account-by-token'
import { type AccountModel } from '~/domain/models/account'
import { mockAccountModel } from '~/domain/test'
import { type AuthenticationModel } from '~/domain/models/authentication'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
      return await Promise.resolve(true)
    }
  }

  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return await Promise.resolve({
        accessToken: 'any_token',
        name: 'any_name'
      })
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
