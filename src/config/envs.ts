/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3001),
  })
  .unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
  PORT: envVars.PORT,
}
