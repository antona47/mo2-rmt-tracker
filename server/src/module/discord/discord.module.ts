import { Module } from '@nestjs/common'

import { AuthModule } from '@/module/auth/auth.module'
import { ImageModule } from '@/module/image/image.module'
import { UserModule } from '@/module/user/user.module'

import { DiscordController } from './discord.controller'

import { DiscordService } from './discord.service'





@Module({
  imports: [
    AuthModule,
    ImageModule,
    UserModule
  ],
  controllers: [
    DiscordController
  ],
  providers: [
    DiscordService
  ],
  exports: [
    DiscordService
  ]
})





export class DiscordModule {}