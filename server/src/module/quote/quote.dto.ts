import { IsDate, IsEnum } from 'class-validator'
import { Transform, Type } from 'class-transformer'

import Provider from '@@/enum/provider'
import Period from '@@/enum/period'

import { IQuotesData, IQuotesRequest, IQuotesResponse } from '@@/interface/request/quotes'
import { GenericResponse } from '@/interface/response'

import { zeroedDate } from '@/util/dates'





export class QuotesRequestDTO implements IQuotesRequest {
  @IsEnum(Provider)
  provider: Provider

  @IsEnum(Period)
  period: Period

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
  data: IQuotesData
}