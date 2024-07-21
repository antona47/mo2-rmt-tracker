import Provider from "@@/enum/provider"





export interface ISalesRequest {
  provider: Provider
  startDate: Date
  endDate: Date
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