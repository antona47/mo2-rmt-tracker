import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MoreThan, LessThan } from 'typeorm'
import { Cron } from '@nestjs/schedule'

import { UserService } from '@/module/user/user.service'

import { Session } from './session.entity'
import { User } from '@/module/user/user.entity'

import { AuthRequest } from '@/interface/auth-request'

import env from '@/util/env'
import { generateBase64Token } from '@/util/crypt'
import { freshSessionTerm, awaitIfTest } from '@/util/misc'
import { config } from 'node-config-ts'





@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private readonly userService: UserService
  ) {}





  async session(user:User):Promise<Session> {
    //check for existing session
    let session = await this.sessionRepository.findOne({
      where: { user_id: user.id, valid_until: MoreThan(new Date()) }
    })

    //if exists, renew and return
    if (session) {
      await this.sessionRepository.update({ id: session.id }, { valid_until: freshSessionTerm() })
      return session
    }

    //generate new session
    session = new Session()
    session.user_id = user.id
    session.session_token = await generateBase64Token(config.auth.tokenLength)
    session.csrf_token = await generateBase64Token(config.auth.tokenLength)
    session.valid_until = freshSessionTerm()

    //persist new session
    await this.sessionRepository.save(session)

    //success
    return session
  }





  async authenticate(request:AuthRequest, checkCSRF?:boolean):Promise<boolean> {
    //grab token
    const session_token = request.cookies['session']
    if (!session_token) return false

    //find session
    const session = await this.sessionRepository.findOne({ where: { session_token, valid_until: MoreThan(new Date()) } })
    if (!session) return false

    //check csrf?
    if (checkCSRF) {
      const csrf_token = request.headers['csrf-token']
      if (csrf_token !== session.csrf_token) return false
    }

    //find user
    const user = await this.userService.getById(session.user_id)
    if (!user) return false

    //should this user be an admin?
    const shouldBeAdmin = request.body.admin //set by admin auth guard if not otherwise requested
    if (shouldBeAdmin && !user.isAdmin) return false

    //extend session (don't wait unless in test mode)
    await awaitIfTest(() => {
      return this.sessionRepository.update({ id: session.id }, { valid_until: freshSessionTerm() })
    })

    //update last login if appropriate
    if (Number(user.last_login) < Date.now() - config.auth.updateLastLoginAfter) {
      await awaitIfTest(() => {
        user.last_login = new Date()
        return this.userService.update(user)
      })
    }

    //attach and go
    request.session = session
    request.user = user
    return true
  }





  async endSession(request:AuthRequest):Promise<void> {
    const sessionId = request.session?.id
    if (!sessionId) return

    await this.sessionRepository.delete({ id: sessionId })
  }





  @Cron(config.auth.sessionCleanupCronPattern, { name: 'session cleanup' })
  private async SessionCleanup() {
    if (env.isTEST) return

    await this.sessionRepository.delete({ valid_until: LessThan(new Date()) })
  }

}