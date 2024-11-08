import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ISession } from "@/context/session.context"





export interface IPost {
  session?: ISession
  pkg: any
  onSuccess: (a?:any) => void
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





const post = async (path:string, { session, pkg, onSuccess, onFail, onError }:IPost) => {
  //post data
  const submitUrl = `${process.env.NEXT_PUBLIC_API_PATH}${path}`
  
  const options:AxiosRequestConfig = {}
  if (session) options.headers = { 'csrf-token': session.csrf_token }

  const resp = await axios.post(submitUrl, pkg, options).catch(onError || onErrorDefault)

  //did the request succeed?
  if (!resp || resp.status !== 201) return

  //did we get what we wanted?
  onFail = onFail || onFailDefault
  if (!resp.data.status) return onFail(resp.data)

  //success
  onSuccess(resp.data)
}





export default post