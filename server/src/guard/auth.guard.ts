import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from '../module/auth/auth.service'
import { AuthRequest } from '../interface/auth-request'
import { Response } from 'express'





@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ) {}

  async canActivate(context:ExecutionContext):Promise<boolean> {
    const request:AuthRequest = context.switchToHttp().getRequest()
    const response:Response = context.switchToHttp().getResponse()

    //attempt auth
    const success = this.authService.authenticate(request, true)

    //if failed, clear cookie
    if (!success) response.clearCookie('session')

    return success
  }
}





@Injectable()
export class OptionalAuthGuard extends AuthGuard {
  constructor(authService: AuthService) {
    super(authService)
  }

  async canActivate(context:ExecutionContext):Promise<boolean> {
    //if no auth passed, just proceed
    const request:AuthRequest = context.switchToHttp().getRequest()
    const session_token = request.cookies['session']
    if (!session_token) return true

    //auth with super
    return super.canActivate(context)
  }
}