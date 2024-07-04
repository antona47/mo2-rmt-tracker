import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { PlayerAuctionsService } from './provider/playerAuctions/playerAuctions.service'

import { config } from 'node-config-ts'
import env from '@/utils/env'





@Injectable()
export class DataService implements OnApplicationBootstrap {
  constructor(
    private readonly playerAuctionsService: PlayerAuctionsService
  ) {}





  async onApplicationBootstrap() {
    await this.import()
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