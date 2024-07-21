import { GenericResponse } from '@/interface/response'
import { IAUserData, IAUsersResponse } from '@@/interface/request/admin/users'





export class AUsersResponseDTO extends GenericResponse implements IAUsersResponse {
  data: IAUserData[]
}