import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '@/module/user/user.module'

import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'

import { Session } from './session.entity'





@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    UserModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthService
  ]
})





export class AuthModule {}