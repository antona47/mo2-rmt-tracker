import Provider from "@@/enum/provider"





export interface IBuyersRequest {
  provider: Provider
  startDate: Date
  endDate: Date
}





export interface IBuyerData {
  buyer: string
  // nickname: string
  // comments: string
  transactions: number
  volume: number
  latest: Date
}



export interface IBuyersResponse {
  status: number
  data: IBuyerData[]
}