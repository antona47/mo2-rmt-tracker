import { IsString, Length } from 'class-validator'
import { GenericResponse } from '@/interface/response'





export class DiscordOauthRequestDTO {
  @IsString()
  @Length(30, 30)
  code: string
}

export class DiscordOauthResponseDTO extends GenericResponse {}