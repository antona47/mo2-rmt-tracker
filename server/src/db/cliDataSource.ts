import env from '@/utils/env'
env

import { DataSource } from 'typeorm'
import { dbConfig } from './config'





export default new DataSource(dbConfig)