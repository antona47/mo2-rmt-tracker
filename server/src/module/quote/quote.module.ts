import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { QuoteService } from './quote.service'

import { Quote } from './quote.entity'





@Module({
  imports: [
    TypeOrmModule.forFeature([Quote])
  ],
  controllers: [],
  providers: [
    QuoteService
  ],
  exports: [
    QuoteService
  ]
})





export class QuoteModule {}