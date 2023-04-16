import { type AccountModel } from '~/domain/models'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<boolean>
}

export namespace AddAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = boolean
}
