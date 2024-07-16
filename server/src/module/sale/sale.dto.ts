import { IsDate, IsEnum } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { zeroedDate } from '@/util/misc'

import { GenericResponse } from '@/interface/response'

import Provider from '@@/enum/provider'
import { ISalesData, ISalesRequest, ISalesResponse } from '@@/interface/request/sales'





export class SalesRequestDTO implements ISalesRequest {
  @IsEnum(Provider)
  provider: Provider

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => zeroedDate(value))
  startDate: Date

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => zeroedDate(value))
  endDate: Date
}

export class SalesResponseDTO extends GenericResponse implements ISalesResponse {
  data: ISalesData[]
}