import post, { IPost } from "../post"
import { ISession } from "@/context/session.context"
import { IASetAccessRequest, IASetAccessResponse } from "@@/interface/request/admin/setAccess"





interface ISetAccess extends IPost {
  session: ISession
  pkg: IASetAccessRequest
  onSuccess: (a:IASetAccessResponse) => void
}





const setAccess = async (args:ISetAccess) => {
  await post('/admin/users/setAccess', args)
}





export default setAccess