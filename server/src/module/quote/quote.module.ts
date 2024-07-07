import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { QuoteController } from './quote.controller'

import { QuoteService } from './quote.service'

import { Quote } from './quote.entity'





@Module({
  imports: [
    TypeOrmModule.forFeature([Quote])
  ],
  controllers: [
    QuoteController
  ],
  providers: [
    QuoteService
  ],
  exports: [
    QuoteService
  ]
})





export class QuoteModule {}