import env from '~/main/config/env'
import { type LoadAccountByToken } from '~/domain/usecases'
import { DbLoadAccountByToken } from '~/data/usecases'
import { JwtAdapter } from '~/infra/cryptography'
import { AccountMongoRepository } from '~/infra/db'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
