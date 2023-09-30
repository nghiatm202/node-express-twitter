import { config } from 'dotenv'
import { createHash } from 'crypto'

config()

export const sha256 = (content: string) => {
  return createHash('sha256').update(content).digest('hex')
}

export const hashPassword = (password: string) => {
  return sha256(password + process.env.PASSWORD_SECRET)
}
