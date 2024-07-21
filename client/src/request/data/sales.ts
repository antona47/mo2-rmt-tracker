import post, { IPost } from "../post"
import { ISalesRequest, ISalesResponse } from "@@/interface/request/sales"





interface ISales extends IPost {
  pkg: ISalesRequest
  onSuccess: (a:ISalesResponse) => void
}





const getSales = async (args:ISales) => {
  await post('/sales', args)
}





export default getSales