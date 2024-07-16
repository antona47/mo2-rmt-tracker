import { CookieOptions } from 'express'
import { config } from 'node-config-ts'



export const cookieOptions:CookieOptions = {
  path: '/',
  httpOnly: true,
  secure: config.auth.cookie_is_secure,
  maxAge: config.auth.sessionValidDuration
}