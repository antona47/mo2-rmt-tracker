import { Module } from '@nestjs/common'

import { AdminModule } from './module/admin/admin.module'
import { AuthModule } from './module/auth/auth.module'
import { DataModule } from '@/module/data/data.module'
import { DiscordModule } from './module/discord/discord.module'
import { ImageModule } from './module/image/image.module'
import { QuoteModule } from './module/quote/quote.module'
import { SaleModule } from './module/sale/sale.module'
import { UserModule } from './module/user/user.module'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { typeormModuleConfig } from '@/db/config'





@Module({
  imports: [
    AdminModule,
    AuthModule,
    DataModule,
    DiscordModule,
    ImageModule,
    QuoteModule,
    SaleModule,
    UserModule,
    TypeOrmModule.forRoot(typeormModuleConfig),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: []
})





export class AppModule {}