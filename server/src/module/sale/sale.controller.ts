import { Controller, Post, Body } from '@nestjs/common'

import { SaleService } from './sale.service'

import { SalesResponseDTO, SalesRequestDTO } from './sale.dto'
import { ErrorResponse } from '@/interface/response'

import { zeroedDate } from '@/util/misc'
import { config } from 'node-config-ts'





@Controller()
export class SaleController {
  constructor(
    private readonly saleService: SaleService
  ) {}





  @Post('/sales')
  async sales(@Body() payload:SalesRequestDTO):Promise<SalesResponseDTO | ErrorResponse> {
    //make sure date range isn't negative
    if (payload.endDate < payload.startDate) {
      payload.endDate = payload.startDate
    }

    //limit date range
    if (payload.endDate.getTime() - payload.startDate.getTime() > config.data.exportMaxDateRange) {
      payload.startDate = zeroedDate(new Date(payload.endDate.getTime() - config.data.exportMaxDateRange))
    }

    //fetch data
    const data = await this.saleService.getSales(payload.provider, payload.startDate, payload.endDate)

    //success
    return {
      status: 1,
      data
    }
  }

}