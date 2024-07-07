import { Controller, Post, Body } from '@nestjs/common'

import { SaleService } from './sale.service'

import { SalesResponseDTO, SalesRequestDTO } from './sale.dto'
import { ErrorResponse } from '@/interfaces/response'





@Controller()
export class SaleController {
  constructor(
    private readonly saleService: SaleService
  ) {}





  @Post('/sales')
  async sales(@Body() payload:SalesRequestDTO):Promise<SalesResponseDTO | ErrorResponse> {
    const data = await this.saleService.getSales(payload.provider)

    return {
      status: 1,
      data
    }
  }

}