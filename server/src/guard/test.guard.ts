import { Injectable, CanActivate } from "@nestjs/common"
import env from '@/util/env'





@Injectable()
export class TestOnlyGuard implements CanActivate {
  constructor() {}

  canActivate():boolean {
    return env.isTEST
  }
}