import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { Sale } from './sale.entity'

import Provider from '@@/enum/provider'
import Period from '@@/enum/period'

import { ISalesData } from '@@/interface/request/sales'
import { IBuyerData } from '@@/interface/request/private/buyers'
import { ICreateSale } from './sale.interfaces'

import { shortDate, shortMonth } from '@/util/dates'





@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectDataSource()
    private dataSource: DataSource
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





  async getSales(provider:Provider, period:Period, startDate:Date, endDate:Date, buyer?:string):Promise<ISalesData[]> {
    const where:string[] = []
    const params:any[] = [startDate, endDate]

    //build where clause
    if (provider !== Provider.NONE) addWhereClause(`provider`, provider, where, params)
    if (buyer) addWhereClause(`buyer`, buyer, where, params)

    //build query
    const query = `
      SELECT
        t1.date,
        t2.amount,
        t2.value,
        t2.count
      FROM (
        SELECT
          date,
          To_char(date, '${periodMask(period)}') as date_string
        FROM
          generate_series($1::DATE, $2::DATE, '${periodSeries(period)}'::interval) as date
      ) t1
      LEFT OUTER JOIN (
        SELECT
          SUM(amount) as amount,
          SUM(value) as value,
          COUNT(id) as count,
          To_char(date, '${periodMask(period)}') as date_string
        FROM sales
        ${where.length ? `WHERE ${where.join(` AND `)}` : ``}
        GROUP BY date_string
      ) t2
      ON t1.date_string = t2.date_string
    `

    //fetch
    const queryResult = await this.dataSource.query(query, params)

    //define output packer
    const packer = (sale:any):ISalesData => ({
      amount: Number(sale.amount || 0),
      value: Number(sale.value / 100 || 0),
      count: Number(sale.count || 0),
      date: formatDate(sale.date, period)
    })

    //pack and return
    return queryResult.map(packer)
  }





  async getBuyers(provider:Provider, startDate:Date, endDate:Date):Promise<IBuyerData[]> {
    const query = this.saleRepository.createQueryBuilder("sales")
      .select(`buyer`)
      .addSelect(`COUNT(id)`, `transactions`)
      .addSelect(`SUM(value)`, `volume`)
      .addSelect(`MAX(date)`, `latest`)
      .where(`date >= :startDate AND date <= :endDate`, { startDate, endDate })
      .groupBy(`buyer`)

    //where clause
    if (provider !== Provider.NONE) query.andWhere(`provider = :provider`, { provider })

    //fetch
    const queryResult = await query.getRawMany()

    //success
    return queryResult.map((buyer) => ({
      buyer: buyer.buyer,
      transactions: Number(buyer.transactions),
      volume: Number(buyer.volume),
      latest: buyer.latest
    }))
  }

}





const addWhereClause = (condition:string, param:any, where:string[], params:any[]) => {
  params.push(param)
  where.push(`${condition} = $${params.length}`)
}





const periodMask = (period:Period):string => {
  if (period === Period.DAY) return `IYYY-MM-DD`
  if (period === Period.WEEK) return `IYYY-IW`
  if (period === Period.MONTH) return `IYYY-MM`
  if (period === Period.YEAR) return `IYYY`
}





const periodSeries = (period:Period):string => {
  if (period === Period.DAY) return `1 day`
  if (period === Period.WEEK) return `1 week`
  if (period === Period.MONTH) return `1 month`
  if (period === Period.YEAR) return `1 year`
}





const formatDate = (date:Date, period:Period):string => {
  if (period === Period.DAY) return shortDate(date)
  if (period === Period.WEEK) return shortDate(date)
  if (period === Period.MONTH) return shortMonth(date)
  if (period === Period.YEAR) return `${date.getFullYear()}`
}