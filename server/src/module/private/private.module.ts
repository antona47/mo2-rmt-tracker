import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

import { PrivateController } from './private.controller'

import { SaleService } from '@/module/sale/sale.service'





@Module({
  imports: [
    AuthModule,
    UserModule
  ],
  controllers: [
    PrivateController
  ],
  providers: [
    SaleService
  ],
  exports: []
})





export class PrivateModule {}