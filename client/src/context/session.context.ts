import { createContext } from 'react'

import { ISessionResponse } from '@@/interface/request/session'





//INTERFACES

export interface ISession extends ISessionResponse {}





//DEFAULTS

const sessionDefaults:ISession = {
  status: 0,
  id: '',
  name: '',
  csrf_token: '',
  hasAccess: false,
  isAdmin: false
}





//CONTEXT

export const sessionContext = createContext(sessionDefaults)



export const sessionConstructor = (
  session: ISessionResponse | null
):ISession => {
  session = session || sessionDefaults
  return {
    status: session.status,
    id: session.id,
    name: session.name,
    csrf_token: session.csrf_token,
    hasAccess: session.hasAccess,
    isAdmin: session.isAdmin
  }
}