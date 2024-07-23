import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common'
import { AdminGuard } from '@/guard/admin.guard'

import { AdminService } from './admin.service'

import { ASetAccessRequestDTO, ASetAccessResponseDTO, AUsersResponseDTO } from './admin.dto'
import { ErrorResponse } from '@/interface/response'
import adminResponse from './admin.response'





@Controller('/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) {}





  @UseGuards(AdminGuard)
  @Get('/users')
  async users():Promise<AUsersResponseDTO | ErrorResponse> {
    const users = await this.adminService.getUsers()

    return {
      status: 1,
      data: users
    }
  }





  @UseGuards(AdminGuard)
  @Post('/users/setAccess')
  async setAccess(@Body() payload:ASetAccessRequestDTO):Promise<ASetAccessResponseDTO | ErrorResponse> {
    //check user validity
    const user = await this.adminService.getUserById(payload.userId)
    if (!user) return adminResponse['USER_NOT_FOUND']

    //apply access
    await this.adminService.setUserAccess(user, payload.setAccess)

    //success
    return {
      status: 1
    }
  }

}