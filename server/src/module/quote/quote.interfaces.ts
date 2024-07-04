import Provider from "@@/enum/provider"





export interface ICreateQuote {
  provider: Provider
  price: number
  offers: number
  date: Date
}