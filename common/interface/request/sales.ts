import Provider from "@@/enum/provider"





export interface ISalesRequest {
  provider: Provider
}





export interface ISaleData {
  value: number
  date: string
}

export interface ISalesResponse {
  data: ISaleData[]
}