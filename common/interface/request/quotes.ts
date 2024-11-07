import Period from "@@/enum/period"
import Provider from "@@/enum/provider"





export interface IQuotesRequest {
  provider: Provider
  period: Period
  startDate: Date
  endDate: Date
}





export interface IQuotesData {
  minPrice: number
  maxPrice: number
  quotes: {
    price: number
    offers: number
    date: string
  }[]
}

export interface IQuotesResponse {
  status: number
  data: IQuotesData
}