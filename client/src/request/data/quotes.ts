import post, { IPost } from "../post"
import { IQuotesRequest } from "@@/interface/request/quotes"





interface IQuotes extends IPost {
  pkg: IQuotesRequest
}





const getQuotes = async (args:IQuotes) => {
  await post('/quotes', args)
}





export default getQuotes