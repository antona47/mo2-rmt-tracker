import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'

import { Sale } from './sale.entity'

import Provider from '@@/enum/provider'
import { ISaleData } from '@@/interface/request/sales'
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





  async getSales(provider:Provider):Promise<ISaleData[]> {
    //compose where clause
    const where:FindOptionsWhere<Sale> = {}
    if (provider !== Provider.NONE) where.provider = provider

    //fetch
    const result = await this.saleRepository.find({ where })

    //pack and return
    return result.map((sale) => ({
      value: sale.amount,
      date: `${sale.date.getDate()}/${sale.date.getMonth()}/${sale.date.getFullYear()}`
    }))
  }

}