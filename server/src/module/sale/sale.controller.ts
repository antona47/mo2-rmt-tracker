import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { PrivateGuard } from '@/guard/private.guard'

import { SaleService } from './sale.service'

import { SalesResponseDTO, SalesRequestDTO, BuyersRequestDTO, BuyersResponseDTO } from './sale.dto'
import { ErrorResponse } from '@/interface/response'

import { restrictDates } from '@/util/dates'





@Controller()
export class SaleController {
  constructor(
    private readonly saleService: SaleService
  ) {}





  @Post('/sales')
  async sales(@Body() payload:SalesRequestDTO):Promise<SalesResponseDTO | ErrorResponse> {
    //restrict date range
    restrictDates(payload)

    //fetch data
    const data = await this.saleService.getSales(payload.provider, payload.startDate, payload.endDate, payload.buyer)

    //success
    return {
      status: 1,
      data
    }
  }





  @UseGuards(PrivateGuard)
  @Post('/buyers')
  async buyers(@Body() payload:BuyersRequestDTO):Promise<BuyersResponseDTO | ErrorResponse> {
    //restrict dates
    restrictDates(payload)

    //fetch data
    const buyers = await this.saleService.getBuyers(payload.provider, payload.startDate, payload.endDate)

    //success
    return {
      status: 1,
      data: buyers
    }
  }

}