import { IsDate, IsEnum } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { GenericResponse } from '@/interface/response'
import { zeroedDate } from '@/util/misc'

import Provider from '@@/enum/provider'
import { IQuotesData, IQuotesRequest, IQuotesResponse } from '@@/interface/request/quotes'





export class QuotesRequestDTO implements IQuotesRequest {
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

export class QuotesResponseDTO extends GenericResponse implements IQuotesResponse {
  data: IQuotesData[]
}