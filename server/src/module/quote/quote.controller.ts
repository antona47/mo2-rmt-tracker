import { Controller, Post, Body } from '@nestjs/common'

import { QuoteService } from './quote.service'

import { QuotesResponseDTO, QuotesRequestDTO } from './quote.dto'
import { ErrorResponse } from '@/interfaces/response'





@Controller()
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService
  ) {}





  @Post('/quotes')
  async quotes(@Body() payload:QuotesRequestDTO):Promise<QuotesResponseDTO | ErrorResponse> {
    const data = await this.quoteService.getQuotes(payload.provider)

    return {
      status: 1,
      data
    }
  }

}