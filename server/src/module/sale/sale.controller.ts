import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { PrivateGuard } from '@/guard/private.guard'

import { SaleService } from './sale.service'

import Period from '@@/enum/period'
import { SalesResponseDTO, SalesRequestDTO, BuyersRequestDTO, BuyersResponseDTO } from './sale.dto'
import { ErrorResponse } from '@/interface/response'

import { adjustDatesToPeriod, restrictDates } from '@/util/dates'





@Controller()
export class SaleController {
  constructor(
    private readonly saleService: SaleService
  ) {}





  @Post('/sales')
  async sales(@Body() payload:SalesRequestDTO):Promise<SalesResponseDTO | ErrorResponse> {
    //fix dates
    restrictDates(payload)
    adjustDatesToPeriod(payload)

    //fetch data
    const data = await this.saleService.getSales(payload.provider, payload.period, payload.startDate, payload.endDate, payload.buyer)

    //success
    return {
      status: 1,
      data
    }
  }





  @UseGuards(PrivateGuard)
  @Post('/buyers')
  async buyers(@Body() payload:BuyersRequestDTO):Promise<BuyersResponseDTO | ErrorResponse> {
    //fix dates
    restrictDates({
      startDate: payload.startDate,
      endDate: payload.endDate,
      period: Period.DAY
    })

    //fetch data
    const buyers = await this.saleService.getBuyers(payload.provider, payload.startDate, payload.endDate)

    //success
    return {
      status: 1,
      data: buyers
    }
  }

}