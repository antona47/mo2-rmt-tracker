import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Sale } from './sale.entity'

import { ICreateSale } from './sale.interfaces'





@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>
  ) {}





  async create(data:ICreateSale):Promise<Sale> {
    //compose sale
    const sale = new Sale()
    sale.provider = data.provider
    sale.buyer = data.buyer
    sale.amount = data.amount
    sale.comment = data.comment
    sale.date = data.date

    //attempt insert
    return this.saleRepository.save(sale)
  }





  async getLatestDate():Promise<Date> {
    const latest = await this.saleRepository.createQueryBuilder().select(`MAX(date)`).getRawOne()
    return latest.max
  }

}