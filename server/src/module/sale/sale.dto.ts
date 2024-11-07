import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator'
import { Transform, Type } from 'class-transformer'

import Provider from '@@/enum/provider'

import { GenericResponse } from '@/interface/response'
import { ISalesData, ISalesRequest, ISalesResponse } from '@@/interface/request/sales'
import { IBuyerData, IBuyersRequest, IBuyersResponse } from '@@/interface/request/private/buyers'

import { zeroedDate } from '@/util/dates'
import Period from '@@/enum/period'





export class SalesRequestDTO implements ISalesRequest {
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

  @IsOptional()
  @IsString()
  @Length(1, 30)
  buyer?: string
}

export class SalesResponseDTO extends GenericResponse implements ISalesResponse {
  data: ISalesData[]
}





export class BuyersRequestDTO implements IBuyersRequest {
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

export class BuyersResponseDTO extends GenericResponse implements IBuyersResponse {
  data: IBuyerData[]
}