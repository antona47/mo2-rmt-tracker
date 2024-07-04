import { Module } from '@nestjs/common'

import { SaleModule } from '../sale/sale.module'

import { DataService } from './data.service'
import { PlayerAuctionsService } from './provider/playerAuctions/playerAuctions.service'





@Module({
  imports: [
    SaleModule
  ],
  controllers: [],
  providers: [
    DataService,
    PlayerAuctionsService
  ],
  exports: [
    DataService
  ]
})





export class DataModule {}