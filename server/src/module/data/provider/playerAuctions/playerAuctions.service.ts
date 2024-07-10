import { Injectable } from '@nestjs/common'

import { QuoteService } from '@/module/quote/quote.service'
import { SaleService } from '@/module/sale/sale.service'

import Provider from '@@/enum/provider'

import * as Acquisition from './acquisition'
import { IPlayerAuctionsEntry } from './interfaces'

import env from '@/utils/env'
import { delay, shortDate } from '@/utils/misc'
import { config } from 'node-config-ts'





@Injectable()
export class PlayerAuctionsService {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly saleService: SaleService
  ) {
    Acquisition.init()
  }





  async import() {
    await this.importQuote()
    await this.importSales()
  }





  async importSales() {
    //figure out the latest date to persist entries for
    const now = new Date()
    const latestDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - config.data.playerAuctions.trailDateBy)
  
    //figure out the earliest date to persist entries for
    const earliestDate = (await this.saleService.getLatestDate()) || new Date(0)

    //if there won't be anything new, return
    if (earliestDate >= latestDate) {
      log(`skipping PlayerAuctions sales import - no new data expected`)
      return
    }

    log(`starting PlayerAuctions sales import (${shortDate(latestDate)} to ${shortDate(earliestDate)})`)
  
    //begin scrape
    let page = 0
    let results:IPlayerAuctionsEntry[] = []

    do {
      page++
      log(`fetching PlayerAuctions page ${page}`)
      results = await Acquisition.getPage(page)
      
      //for each entry
      for (let i = 0; i < results.length; i++) {
        const entry = results[i]

        //skip entries past the latest date
        if (entry.date > latestDate) continue

        //early return if we're past the earliest date
        if (entry.date <= earliestDate) {
          log(`completed PlayerAuctions sales import - reached earliest date`)
          return
        }

        //fetch quote for the given date
        const price = await this.quoteService.getPriceForDate(Provider.PLAYER_AUCTIONS, entry.date)

        //calculate the value of the gold on that day
        const value = Math.round(price / 10000 * entry.amount)

        //persist entry
        log(`persisting playerAuctions ${entry.buyer} ${entry.amount}g ${shortDate(entry.date)}`)
        await this.saleService.create({ provider: Provider.PLAYER_AUCTIONS, price, value, ...entry })
      }

      //delay next request
      await delay(config.data.playerAuctions.delayBetweenRequests)

      //continue while there are results
    } while (results.length)

    log(`completed PlayerAuctions sales import - out of data`)
  }





  async importQuote() {
    //figure out the last recorded date
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastDate = await this.quoteService.getLatestDate()

    //if there won't be anything new, return
    if (lastDate && lastDate >= date) {
      log(`skipping PlayerAuctions quote import - no new data expected`)
      return
    }

    //fetch
    const quote = await Acquisition.getQuote()

    //persist
    await this.quoteService.create({ provider: Provider.PLAYER_AUCTIONS, date, ...quote })

    log(`completed PlayerAuctions quote import - price: $${(quote.price / 100).toFixed(2)} offers: ${quote.offers}`)
  }

}





const log = (message:string) => {
  if (config.data.playerAuctions.logs) console.log(`[${env.is}] ${message}`)
}