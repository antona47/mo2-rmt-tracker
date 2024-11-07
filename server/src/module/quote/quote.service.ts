import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThanOrEqual, DataSource } from 'typeorm'

import { Quote } from './quote.entity'

import Provider from '@@/enum/provider'
import Period from '@@/enum/period'

import { IQuotesData } from '@@/interface/request/quotes'
import { ICreateQuote, IPriceForDateCache } from './quote.interfaces'

import { addWhereClause, periodMask, periodSeries } from '@/util/query'
import { formatDate } from '@/util/dates'





@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectDataSource()
    private dataSource: DataSource
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





  async getQuotes(provider:Provider, period:Period, startDate:Date, endDate:Date):Promise<IQuotesData> {
    const where:string[] = []
    const params:any[] = [startDate, endDate]

    //build where clause
    if (provider !== Provider.NONE) addWhereClause(`provider`, provider, where, params)

    //build query
    const query = `
      SELECT
        t1.date,
        t2.price,
        t2.min_price,
        t2.max_price,
        t2.offers
      FROM (
        SELECT
          date,
          To_char(date, '${periodMask(period)}') as date_string
        FROM
          generate_series($1::DATE, $2::DATE, '${periodSeries(period)}'::interval) as date
      ) t1
      LEFT OUTER JOIN (
        SELECT
          AVG(price) as price,
          MIN(price) as min_price,
          MAX(price) as max_price,
          SUM(offers) as offers,
          To_char(date, '${periodMask(period)}') as date_string
        FROM quotes
        ${where.length ? `WHERE ${where.join(` AND `)}` : ``}
        GROUP BY date_string
      ) t2
      ON t1.date_string = t2.date_string
    `

    //fetch
    const queryResult = await this.dataSource.query(query, params)

    //compose response
    const result:IQuotesData = {
      minPrice: 0,
      maxPrice: 0,
      quotes: []
    }

    for (const row of queryResult) {
      if (!row.price) continue

      const minPrice = Number(row.min_price)
      if (!result.minPrice || minPrice < result.minPrice) result.minPrice = minPrice
      const maxPrice = Number(row.max_price)
      if (!result.maxPrice || maxPrice > result.maxPrice) result.maxPrice = maxPrice

      result.quotes.push({
        price: Math.round(Number(row.price)) / 100,
        offers: Number(row.offers),
        date: formatDate(row.date, period)
      })
    }

    result.minPrice = Math.round(result.minPrice) / 100
    result.maxPrice = Math.round(result.maxPrice) / 100

    //success
    return result
  }

}