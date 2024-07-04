import { config } from 'dotenv'
import { z } from 'zod'

if(process.env.DATABASE_URL === 'test'){
  config({ path: '.env.test '})
} else {
  config()
}

const createEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('pg'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = createEnvSchema.safeParse(process.env)

if(_env.success === false){
  console.error('Invalid environment  variables')
  throw new Error('Invalid environment  variables')
}

export const env = _env.data