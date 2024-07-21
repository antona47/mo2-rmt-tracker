import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthService } from '@/module/auth/auth.service'
import { AuthRequest } from '@/interface/auth-request'
import { AuthGuard } from '@/guard/auth.guard'





@Injectable()
export class AdminGuard extends AuthGuard {
  constructor(authService: AuthService) {
    super(authService)
  }

  async canActivate(context:ExecutionContext):Promise<boolean> {
    //attach admin requirement to request
    const request:AuthRequest = context.switchToHttp().getRequest()
    request.body.admin = true

    //auth with super
    return super.canActivate(context)
  }
}