import { IsDate, IsEnum } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { zeroedDate } from '@/util/misc'

import { GenericResponse } from '@/interface/response'

import Provider from '@@/enum/provider'
import { IBuyerData, IBuyersRequest, IBuyersResponse } from '@@/interface/request/private/buyers'





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