import { Controller, Get, UseGuards } from '@nestjs/common'
import { AdminGuard } from '@/guard/admin.guard'

import { AdminService } from './admin.service'

import { AUsersResponseDTO } from './admin.dto'
import { ErrorResponse } from '@/interface/response'





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

}