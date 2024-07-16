import { Request } from 'express'
import { User } from '@/module/user/user.entity'
import { Session } from '@/module/auth/session.entity'





export interface AuthRequest extends Request {
  session: Session
  user: User
}