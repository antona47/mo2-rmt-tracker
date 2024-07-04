import { Injectable } from '@nestjs/common'

import { SaleService } from '@/module/sale/sale.service'

import Provider from '@@/enum/provider'

import * as Acquisition from './acquisition'
import { PlayerAuctionsEntry } from './interfaces'

import env from '@/utils/env'
import { delay, shortDate } from '@/utils/misc'
import { config } from 'node-config-ts'





@Injectable()
export class PlayerAuctionsService {
  constructor(
    private readonly saleService: SaleService
  ) {
    Acquisition.init()
  }





  async scrape() {
    //figure out the latest date to persist entries for
    const now = new Date()
    const latestDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - config.data.playerAuctions.trailDateBy)
  
    //figure out the earliest date to persist entries for
    const earliestDate = (await this.saleService.getLatestDate()) || new Date(0)

    //if there won't be anything new, return
    if (earliestDate >= latestDate) {
      log(`skipping PlayerAuctions import - no new data expected`)
      return
    }

    log(`starting PlayerAuctions import (${shortDate(latestDate)} to ${shortDate(earliestDate)})`)
  
    //begin scrape
    let page = 0
    let results:PlayerAuctionsEntry[] = []

    do {
      page++
      results = await Acquisition.getPage(page)
      
      //for each entry
      for (let i = 0; i < results.length; i++) {
        const entry = results[i]

        //skip entries past the latest date
        if (entry.date > latestDate) continue

        //early return if we're past the earliest date
        if (entry.date <= earliestDate) {
          log(`completed PlayerAuctions import - reached earliest date`)
          return
        }

        //persist entry
        log(`persisting playerAuctions ${entry.buyer} ${entry.amount}g ${shortDate(entry.date)}`)
        this.saleService.create({ provider: Provider.PLAYER_AUCTIONS, ...entry })
      }

      //delay next request
      await delay(config.data.playerAuctions.delayBetweenRequests)

      //continue while there are results
    } while (results.length)

    log(`completed PlayerAuctions import - out of data`)
  }

}





const log = (message:string) => {
  if (config.data.playerAuctions.logs) console.log(`[${env.is}] ${message}`)
}