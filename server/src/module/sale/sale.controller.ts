import { Controller, Post, Body } from '@nestjs/common'

import { SaleService } from './sale.service'

import { SalesResponseDTO, SalesRequestDTO } from './sale.dto'
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

}