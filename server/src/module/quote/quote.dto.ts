import { IsDate, IsEnum } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { GenericResponse } from '@/interfaces/response'
import { zeroedDate } from '@/utils/misc'

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