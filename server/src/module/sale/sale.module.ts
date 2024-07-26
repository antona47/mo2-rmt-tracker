import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'

import { SaleController } from './sale.controller'

import { SaleService } from './sale.service'

import { Sale } from './sale.entity'





@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    AuthModule
  ],
  controllers: [
    SaleController
  ],
  providers: [
    SaleService
  ],
  exports: [
    SaleService
  ]
})





export class SaleModule {}