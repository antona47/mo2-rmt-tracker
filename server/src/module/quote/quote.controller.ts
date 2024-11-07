import { Controller, Post, Body } from '@nestjs/common'

import { QuoteService } from './quote.service'

import { QuotesResponseDTO, QuotesRequestDTO } from './quote.dto'
import { ErrorResponse } from '@/interface/response'

import { zeroedDate } from '@/util/dates'
import { config } from 'node-config-ts'





@Controller()
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService
  ) {}





  @Post('/quotes')
  async quotes(@Body() payload:QuotesRequestDTO):Promise<QuotesResponseDTO | ErrorResponse> {
    //make sure date range isn't negative
    if (payload.endDate < payload.startDate) {
      payload.endDate = payload.startDate
    }

    //limit date range
    if (payload.endDate.getTime() - payload.startDate.getTime() > config.data.exportMaxDateRange) {
      payload.startDate = zeroedDate(new Date(payload.endDate.getTime() - config.data.exportMaxDateRange))
    }

    //fetch data
    const data = await this.quoteService.getQuotes(payload.provider, payload.startDate, payload.endDate)

    //success
    return {
      status: 1,
      data
    }
  }

}