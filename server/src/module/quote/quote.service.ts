import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Quote } from './quote.entity'

import { ICreateQuote } from './quote.interfaces'





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

}