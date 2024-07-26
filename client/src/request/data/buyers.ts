import post, { IPost } from "../post"
import { ISession } from "@/context/session.context"
import { IBuyersRequest, IBuyersResponse } from "@@/interface/request/private/buyers"





interface IBuyers extends IPost {
  session: ISession
  pkg: IBuyersRequest
  onSuccess: (a:IBuyersResponse) => void
}





const getBuyers = async (args:IBuyers) => {
  await post('/buyers', args)
}





export default getBuyers