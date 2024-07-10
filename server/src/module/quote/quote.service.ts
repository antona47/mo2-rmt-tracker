import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere, MoreThanOrEqual } from 'typeorm'

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





  async getQuotes(provider:Provider):Promise<IQuotesData[]> {
    //compose where clause
    const where:FindOptionsWhere<Quote> = {}
    if (provider !== Provider.NONE) where.provider = provider

    //fetch
    const result = await this.quoteRepository.find({ where })

    //pack and return
    return result.map((quote) => ({
      price: quote.price / 100,
      offers: quote.offers,
      date: `${quote.date.getDate()}/${quote.date.getMonth()}/${quote.date.getFullYear()}`
    }))
  }

}