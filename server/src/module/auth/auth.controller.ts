import { Controller, Get, Post, Body, Req, Res, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { AuthRequest } from '@/interface/auth-request'
import { Response } from 'express'

import { AuthService } from './auth.service'

import { InternalGuard } from '@/guard/internal.guard'
import { AuthGuard, OptionalAuthGuard } from '@/guard/auth.guard'

import {
  GetSessionRequestDTO, GetSessionResponseDTO,
  LogoutResponseDTO,
  PingResponse
} from './auth.dto'
import { ErrorResponse } from '@/interface/response'
import authResponse from './auth.response'





@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}




  
  @Post('/internal/getSession')
  @Version(VERSION_NEUTRAL)
  @UseGuards(InternalGuard)
  async getSession(@Body() payload:GetSessionRequestDTO, @Req() req:AuthRequest):Promise<GetSessionResponseDTO | ErrorResponse> {
    //attempt authentication
    const success = await this.authService.authenticate(req)
    if (!success) return authResponse['NO_SESSION_FOUND']

    //success
    return {
      status: 1,
      id: req.user.discord_id,
      name: req.user.name,
      csrf_token: req.session.csrf_token,
      hasAccess: req.user.hasAccess,
      isAdmin: req.user.isAdmin
    }
  }





  @Get('/logout')
  @UseGuards(OptionalAuthGuard)
  async logout(@Req() req:AuthRequest, @Res({ passthrough: true }) res:Response):Promise<LogoutResponseDTO> {
    //delete session record
    await this.authService.endSession(req)

    //clear session cookie
    res.clearCookie('session')

    //success
    return { status: 1 }
  }





  @Get('/ping')
  @UseGuards(AuthGuard)
  async ping():Promise<PingResponse> {
    return { status: 1 }
  }

}