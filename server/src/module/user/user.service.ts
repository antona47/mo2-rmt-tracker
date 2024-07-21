import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'
import { Session } from '../auth/session.entity'





@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}





  async create(discord_id:string, discord_username:string, access_token:string, name:string):Promise<User> {
    //compose user
    const user = new User()
    user.discord_id = discord_id
    user.discord_username = discord_username
    user.discord_access_token = access_token
    user.name = name
    user.last_login = new Date()

    //attempt upsert
    await this.userRepository.upsert(user, {
      conflictPaths: ["discord_id"],
      skipUpdateIfNoValuesChanged: true
    })

    return user
  }





  async getAll():Promise<User[]> {
    return this.userRepository.find()
  }





  async getById(userId:number):Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } })
  }





  async getForSession(session:Session):Promise<User> {
    return this.userRepository.findOne({ where: { id: session.user_id } })
  }





  async update(user:User):Promise<User> {
    return this.userRepository.save(user)
  }

}