import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthService } from '@/module/auth/auth.service'
import { AuthRequest } from '@/interface/auth-request'
import { AuthGuard } from '@/guard/auth.guard'





@Injectable()
export class PrivateGuard extends AuthGuard {
  constructor(authService: AuthService) {
    super(authService)
  }

  async canActivate(context:ExecutionContext):Promise<boolean> {
    //auth with super
    const result = await super.canActivate(context)
    if (!result) return false

    //check access
    const request:AuthRequest = context.switchToHttp().getRequest()
    if (!request.user.hasAccess && !request.user.isAdmin) return false

    //success
    return true
  }
}