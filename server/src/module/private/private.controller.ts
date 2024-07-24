import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { PrivateGuard } from '@/guard/private.guard'

import { SaleService } from '@/module/sale/sale.service'

import { BuyersRequestDTO, BuyersResponseDTO } from './private.dto'
import { ErrorResponse } from '@/interface/response'
import { restrictDates } from '@/util/dates'





@Controller('/private')
export class PrivateController {
  constructor(
    private readonly saleService: SaleService
  ) {}





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