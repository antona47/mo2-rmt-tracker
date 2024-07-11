import Provider from "@@/enum/provider"





export interface IQuotesRequest {
  provider: Provider
  startDate: Date
  endDate: Date
}





export interface IQuotesData {
  price: number
  offers: number
  date: string
}

export interface IQuotesResponse {
  data: IQuotesData[]
}