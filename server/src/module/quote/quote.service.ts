import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThanOrEqual } from 'typeorm'
import { shortDate } from '@/util/dates'

import { Quote } from './quote.entity'

import Provider from '@@/enum/provider'
import { IQuotesData } from '@@/interface/request/quotes'
import { ICreateQuote, IPriceForDateCache } from './quote.interfaces'





@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) {}





  async create(data:ICreateQuote):Promise<Quote> {
    //compose sale
    const quote = new Quote()
    quote.provider = data.provider
    quote.price = data.price
    quote.offers = data.offers
    quote.date = data.date

    //attempt insert
    return this.quoteRepository.save(quote)
  }





  async getLatestDate():Promise<Date> {
    const latest = await this.quoteRepository.createQueryBuilder().select(`MAX(date)`).getRawOne()
    return latest.max
  }





  async getPriceForDate(provider:Provider, date:Date):Promise<number> {
    //check cache for this provider and date
    const cache = this.priceForDateCache
    if (cache.provider === provider && cache.date.getTime() === date.getTime()) {
      return cache.price
    }

    //ok, fetch it from db
    const result = await this.quoteRepository.findOne({
      where: { provider, date: MoreThanOrEqual(date) },
      order: { date: 'ASC' }
    })

    const price = result?.price || 0

    //update cache
    this.priceForDateCache = { provider, date, price }

    //success (or not)
    return price
  }


  private priceForDateCache:IPriceForDateCache = {
    provider: Provider.NONE,
    date: new Date(),
    price: 0
  }





  async getQuotes(provider:Provider, startDate:Date, endDate:Date):Promise<IQuotesData[]> {
    const query = this.quoteRepository.createQueryBuilder("quotes")

    //do we source all providers?
    if (provider === Provider.NONE) {
      query.select(`MIN(price)`, `price`)
        .addSelect(`SUM(offers)`, `offers`)
        .addSelect(`date`)
        .where(`date >= :startDate AND date <= :endDate`, { startDate, endDate })
        .groupBy(`date`)
        .orderBy(`date`, `ASC`)
    }

    //get for specific provider
    else {
      query.select(`price`)
        .addSelect(`offers`)
        .addSelect(`date`)
        .where(`provider = :provider`, { provider })
        .andWhere(`date >= :startDate AND date <= :endDate`, { startDate, endDate })
        .orderBy(`date`, `ASC`)
    }

    //fetch
    const result = await query.getRawMany()

    //pack and return
    return result.map((quote) => ({
      price: Number(quote.price / 100),
      offers: Number(quote.offers),
      date: shortDate(quote.date)
    }))
  }

}