import { Controller, Post, Body, Res, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { Response } from 'express'
import { cookieOptions } from '@/util/cookie'

import { AuthService } from '@/module/auth/auth.service'
import { DiscordService } from './discord.service'
import { ImageService } from '@/module/image/image.service'
import { UserService } from '@/module/user/user.service'

import { InternalGuard } from '@/guard/internal.guard'

import { DiscordOauthResponseDTO, DiscordOauthRequestDTO } from './discord.dto'
import { ErrorResponse } from '@/interface/response'
import discordResponse from './discord.response'





@Controller()
export class DiscordController {
  constructor(
    private readonly authService: AuthService,
    private readonly discordService: DiscordService,
    private readonly imageService: ImageService,
    private readonly userService: UserService
  ) {}





  @Post('/internal/oauth2/discord')
  @Version(VERSION_NEUTRAL)
  @UseGuards(InternalGuard)
  async discord(@Body() payload:DiscordOauthRequestDTO, @Res({ passthrough: true }) res:Response):Promise<DiscordOauthResponseDTO | ErrorResponse> {
    //get user's access token from discord
    const access_token = await this.discordService.getAccessToken(payload.code)
    if (!access_token) return discordResponse['DISCORD_AUTHENTICATION_FAILED']

    //get user info from discord
    const userInfo = await this.discordService.getUserInfo(access_token)
    if (!userInfo) return discordResponse['DISCORD_AUTHENTICATION_FAILED']

    //grab and persist avatar
    const avatar = await this.discordService.getAvatar(userInfo.id, userInfo.avatarToken)
    if (avatar) await this.imageService.storeAvatar(userInfo.id, avatar)

    //persist user
    const user = await this.userService.create(userInfo.id, userInfo.discord_username, access_token, userInfo.name)
    
    //create session
    const session = await this.authService.session(user)

    //set cookie
    res.cookie('session', session.session_token, cookieOptions)

    //success
    return { status: 1 }
  }

}