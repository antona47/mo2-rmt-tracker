import { IsBoolean, IsOptional } from 'class-validator'
import { GenericResponse } from '@/interface/response'





export class GetSessionRequestDTO {
  @IsOptional()
  @IsBoolean()
  admin?: boolean
}

export class GetSessionResponseDTO extends GenericResponse {
  id: string
  name: string
  csrf_token: string
}





export class LogoutResponseDTO extends GenericResponse {}





export class PingResponse extends GenericResponse {}