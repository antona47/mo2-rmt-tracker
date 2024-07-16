import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { AuthRequest } from "@/interface/auth-request"
import { config } from 'node-config-ts'





@Injectable()
export class InternalGuard implements CanActivate {
  constructor() {}

  canActivate(context:ExecutionContext):boolean {
    //grab secret from request
    const request:AuthRequest = context.switchToHttp().getRequest()
    const secret = request.headers['x-internal-secret']

    //validate
    if (!secret || secret !== config.client.internal.secret) return false

    //success
    return true
  }
}