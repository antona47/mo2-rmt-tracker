import Provider from "@@/enum/provider"





export interface ISalesRequest {
  provider: Provider
  startDate: Date
  endDate: Date
}





export interface ISalesData {
  value: number
  date: string
}

export interface ISalesResponse {
  data: ISalesData[]
}