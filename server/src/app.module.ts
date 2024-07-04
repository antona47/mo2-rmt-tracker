import { Module } from '@nestjs/common'

import { DataModule } from '@/module/data/data.module'
import { QuoteModule } from './module/quote/quote.module'
import { SaleModule } from './module/sale/sale.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { typeormModuleConfig } from '@/db/config'





@Module({
  imports: [
    DataModule,
    QuoteModule,
    SaleModule,
    TypeOrmModule.forRoot(typeormModuleConfig),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: []
})





export class AppModule {}