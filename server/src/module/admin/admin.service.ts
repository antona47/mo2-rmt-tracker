import { Injectable } from '@nestjs/common'

import { UserService } from '../user/user.service'

import { User } from '../user/user.entity'
import { IAUserData } from '@@/interface/request/admin/users'





@Injectable()
export class AdminService {
  constructor(
    private userService: UserService
  ) {}





  async getUsers():Promise<IAUserData[]> {
    const data = await this.userService.getAll()

    return data.map((user) => ({
      id: user.id,
      discordId: user.discord_id,
      discordUsername: user.discord_username,
      name: user.name,
      hasAccess: user.hasAccess,
      isAdmin: user.isAdmin,
      firstLogin: user.first_login,
      lastLogin: user.last_login
    }))
  }





  async getUserById(userId:number):Promise<User> {
    return this.userService.getById(userId)
  }





  async setUserAccess(user:User, setAccess:boolean):Promise<void> {
    user.hasAccess = setAccess
    await this.userService.update(user)
  }

}