import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { SaleController } from './sale.controller'

import { SaleService } from './sale.service'

import { Sale } from './sale.entity'





@Module({
  imports: [
    TypeOrmModule.forFeature([Sale])
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