import { ISession } from "@/context/session.context"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"





export interface IGet {
  session?: ISession
  onSuccess: (a:any) => void
  onFail?: (a:any) => void
  onError?: (a:any) => void
}





const onFailDefault = (data:any) => {
  throw Error(`[${data.err_code}] ${data.err_message}`)
}

const onErrorDefault = (err:any) => {
  const resp = err.response as AxiosResponse
  throw Error(`[${resp.status}] ${resp.data.message} - ${resp.config.url}`)
}





const get = async (path:string, { session, onSuccess, onFail, onError }:IGet) => {
  //fetch data
  const dataUrl = `${process.env.NEXT_PUBLIC_API_PATH}${path}`
  
  const options:AxiosRequestConfig = {}
  if (session) options.headers = { 'csrf-token': session.csrf_token }

  const resp = await axios.get(dataUrl, options).catch(onError || onErrorDefault)

  //if the request failed, it should have been .caught()
  if (!resp || resp.status !== 200) return

  //did we get what we wanted?
  onFail = onFail || onFailDefault
  if (!resp.data.status) return onFail(resp.data)

  //success
  onSuccess(resp.data)
}





export default get