import get, { IGet } from "../get"

import { ISession } from "@/context/session.context"
import { IAUsersResponse } from "@@/interface/request/admin/users"





interface IGetUsers extends IGet {
  session: ISession
  onSuccess: (a:IAUsersResponse) => void
}





const getUsers = async (args:IGetUsers) => {
  await get('/admin/users', args)
}





export default getUsers