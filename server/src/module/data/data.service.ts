import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { PlayerAuctionsService } from './provider/playerAuctions/playerAuctions.service'
import { SaleService } from '@/module/sale/sale.service'

import { config } from 'node-config-ts'
import env from '@/util/env'





@Injectable()
export class DataService implements OnApplicationBootstrap {
  constructor(
    private readonly playerAuctionsService: PlayerAuctionsService,
    private readonly saleService: SaleService
  ) {}





  async onApplicationBootstrap() {
    //check if data is empty
    const dataExists = await this.saleService.getLatestDate()

    //if it's empty, import asap
    if (!dataExists) await this.import()
  }





  async import() {
    await this.playerAuctionsService.import()
  }





  @Cron(config.data.importCronPattern, { name: 'data import' })
  private async scheduledImport() {
    if (env.isTEST) return

    await this.import()
  }

}