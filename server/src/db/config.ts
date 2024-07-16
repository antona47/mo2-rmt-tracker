import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSourceOptions } from 'typeorm'
import { compareConfigWith } from './utils'
import { config } from 'node-config-ts'
import env from '@/util/env'





if (env.isTEST) {
  //make sure test db config doesn't match any useful environment
  compareConfigWith('env/prod')
  compareConfigWith('env/dev')
}





export const dbConfig:DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
  entities: ["dist/server/src/module/**/*.entity.js"],
  migrations: ["dist/server/src/db/migrations/*.js"],
  logging: config.db.logging,
  synchronize: false,
  migrationsRun: true,
  dropSchema: env.isTEST
}





export const typeormModuleConfig:TypeOrmModuleOptions = {
  ...dbConfig
}