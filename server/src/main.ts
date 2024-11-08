import env from '@/util/env'
import { config } from 'node-config-ts'

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import * as cookieParser from 'cookie-parser'
import { ValidationPipe, VersioningType } from '@nestjs/common'

import { AppModule } from './app.module'





async function init() {
  //get start time
  const start = Date.now()

  //init
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //global prefix
  app.setGlobalPrefix('api', {
    exclude: ['/internal/getSession', '/internal/oauth2/discord']
  })

  //versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  //register cookies
  app.use(cookieParser())

  //register validator
  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  }))

  //go
  await app.listen(config.server.port, config.server.host)

  //log startup time
  console.log(`- started in ${(Date.now() - start) / 1000}s`)
}





//hello welcome
if (!env.isTEST) console.log(`[${env.is}] starting on ${config.server.host}:${config.server.port}`)

init()
