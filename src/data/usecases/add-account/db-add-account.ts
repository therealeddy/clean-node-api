import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter, type AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryper: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encryper = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encryper.encrypt(accountData.password)

    const account = await this.addAccountRepository.add(Object.assign({},
      accountData, {
        password: hashedPassword
      }
    ))

    return account
  }
}
