import { IsEnum } from 'class-validator'
import { GenericResponse } from '@/interfaces/response'

import Provider from '@@/enum/provider'
import { ISaleData, ISalesRequest, ISalesResponse } from '@@/interface/request/sales'





export class SalesRequestDTO implements ISalesRequest {
  @IsEnum(Provider)
  provider: Provider
}

export class SalesResponseDTO extends GenericResponse implements ISalesResponse {
  data: ISaleData[]
}