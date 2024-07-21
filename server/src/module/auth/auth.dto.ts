import { IsBoolean, IsOptional } from 'class-validator'
import { GenericResponse } from '@/interface/response'
import { ISessionResponse } from '@@/interface/request/internal/session'





export class GetSessionRequestDTO {
  @IsOptional()
  @IsBoolean()
  admin?: boolean
}

export class GetSessionResponseDTO extends GenericResponse implements ISessionResponse {
  id: string
  name: string
  csrf_token: string
  hasAccess: boolean
  isAdmin: boolean
}





export class LogoutResponseDTO extends GenericResponse {}





export class PingResponse extends GenericResponse {}