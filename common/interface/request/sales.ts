import Period from "@@/enum/period"
import Provider from "@@/enum/provider"





export interface ISalesRequest {
  provider: Provider
  period: Period
  startDate: Date
  endDate: Date
  buyer?: string
}





export interface ISalesData {
  amount: number
  value: number
  count: number
  date: string
}

export interface ISalesResponse {
  status: number
  data: ISalesData[]
}