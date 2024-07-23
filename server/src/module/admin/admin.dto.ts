import { GenericResponse } from '@/interface/response'
import { IASetAccessRequest, IASetAccessResponse } from '@@/interface/request/admin/setAccess'
import { IAUserData, IAUsersResponse } from '@@/interface/request/admin/users'
import { IsBoolean, IsInt, IsNumber, Min } from 'class-validator'





export class AUsersResponseDTO extends GenericResponse implements IAUsersResponse {
  data: IAUserData[]
}





export class ASetAccessRequestDTO implements IASetAccessRequest {
  @IsNumber()
  @IsInt()
  @Min(1)
  userId: number

  @IsBoolean()
  setAccess: boolean
}

export class ASetAccessResponseDTO extends GenericResponse implements IASetAccessResponse {}