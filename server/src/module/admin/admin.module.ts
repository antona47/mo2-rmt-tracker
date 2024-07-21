import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

import { AdminController } from './admin.controller'

import { AdminService } from './admin.service'





@Module({
  imports: [
    AuthModule,
    UserModule
  ],
  controllers: [
    AdminController
  ],
  providers: [
    AdminService
  ],
  exports: []
})





export class AdminModule {}