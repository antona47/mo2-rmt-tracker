import post, { IPost } from "../post"
import { ISalesRequest } from "@@/interface/request/sales"





interface ISales extends IPost {
  pkg: ISalesRequest
}





const getSales = async (args:ISales) => {
  await post('/sales', args)
}





export default getSales