import { type Decrypter } from '~/data/protocols/criptography/decrypter'
import { type LoadAccountByTokenRepository } from '~/data/protocols/db/account/load-account-by-token-repository'
import { type LoadAccountByToken } from '~/domain/usecases/load-account-by-token'
import { type AccountModel } from '~/domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
