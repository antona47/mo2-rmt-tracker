import { IsEnum } from 'class-validator'
import { GenericResponse } from '@/interfaces/response'

import Provider from '@@/enum/provider'
import { IQuotesData, IQuotesRequest, IQuotesResponse } from '@@/interface/request/quotes'





export class QuotesRequestDTO implements IQuotesRequest {
  @IsEnum(Provider)
  provider: Provider
}

export class QuotesResponseDTO extends GenericResponse implements IQuotesResponse {
  data: IQuotesData[]
}