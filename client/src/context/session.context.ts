import { createContext } from 'react'





//INTERFACES

export interface ISessionData {
  status: number
  id: string
  name: string
  csrf_token: string
}

export interface ISession {
  status: number
  id: string
  name: string
  csrf_token: string
}





//DEFAULTS

const set = () => {} //dummy function

const sessionDefaults:ISession = {
  status: 0,
  id: '',
  name: '',
  csrf_token: ''
}

export const sessionDataDefaults:ISessionData = {
  status: 0,
  id: '',
  name: '',
  csrf_token: ''
}





//CONTEXT

export const sessionContext = createContext(sessionDefaults)



export const sessionConstructor = (
  session: ISessionData
):ISession => ({
  status: session.status,
  id: session.id,
  name: session.name,
  csrf_token: session.csrf_token
})