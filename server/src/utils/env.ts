import { config } from 'dotenv'
config({ path: '../.env' })





const EnvModes = ['DEV', 'TEST', 'PROD']





if (!process.env.NODE_ENV) {
  console.log(`No NODE_ENV value detected in .env file. Please set to one of: ${EnvModes.join(', ')}.`)
  process.exit(1)
}

const env = process.env.NODE_ENV.toUpperCase()

if (EnvModes.indexOf(env) < 0) {
  console.log(`Illegal NODE_ENV value "${env}". Please set to one of: ${EnvModes.join(', ')}.`)
  process.exit(1)
}





export default {
  is: env,
  isDEV: env === 'DEV',
  isTEST: env === 'TEST',
  isPROD: env === 'PROD'
}





process.env.NODE_CONFIG_TS_DIR = '../config'