import Provider from "@@/enum/provider"





export interface ICreateSale {
  provider: Provider
  comment: string
  amount: number
  buyer: string
  date: Date
  price: number
  value: number
}