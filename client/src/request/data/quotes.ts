import post, { IPost } from "../post"
import { IQuotesRequest, IQuotesResponse } from "@@/interface/request/quotes"





interface IQuotes extends IPost {
  pkg: IQuotesRequest
  onSuccess: (a:IQuotesResponse) => void
}





const getQuotes = async (args:IQuotes) => {
  await post('/quotes', args)
}





export default getQuotes