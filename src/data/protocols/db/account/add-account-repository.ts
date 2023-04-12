import { type AddAccount } from '~/domain/usecases/account/add-account'
import { type AccountModel } from '~/domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AccountModel
}
