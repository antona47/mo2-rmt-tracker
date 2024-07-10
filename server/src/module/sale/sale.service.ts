import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Sale } from './sale.entity'

import Provider from '@@/enum/provider'
import { ISalesData } from '@@/interface/request/sales'
import { ICreateSale } from './sale.interfaces'

import { populateWithZeroValueDays } from '@/utils/dataHydration'
import { shortDate } from '@/utils/misc'





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
    sale.datePrice = data.price
    sale.value = data.value

    //attempt insert
    return this.saleRepository.save(sale)
  }





  async getLatestDate():Promise<Date> {
    const latest = await this.saleRepository.createQueryBuilder().select(`MAX(date)`).getRawOne()
    return latest?.max
  }





  async getSales(provider:Provider, startDate:Date, endDate:Date):Promise<ISalesData[]> {
    //build query
    const query = this.saleRepository.createQueryBuilder("sales")
      .select(`SUM(amount)`, `amount`)
      .addSelect(`SUM(value)`, `value`)
      .addSelect(`date`)
      .where(`date >= :startDate AND date <= :endDate`, { startDate, endDate })
      .groupBy(`date`)
      .orderBy(`date`, `ASC`)

    //where clause
    if (provider !== Provider.NONE) query.andWhere(`provider = :provider`, { provider })

    //fetch
    const queryResult = await query.getRawMany()

    //define output packer
    const packer = (sale:any | null, date:Date):ISalesData => ({
      amount: Number(sale?.amount || 0),
      value: Number(sale?.value / 100 || 0),
      date: shortDate(date)
    })

    //pack and return
    return populateWithZeroValueDays(startDate, endDate, queryResult, packer)
  }

}