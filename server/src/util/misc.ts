import env from './env'
import { config } from 'node-config-ts'





export const awaitIfTest = async (fn:Function) => {
  if (env.isTEST) await fn()
  else fn()
}





export const freshSessionTerm = ():number => {
  return Date.now() + config.auth.sessionValidDuration
}





export const delay = async (ms:number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}





export const zeroedDate = (date:Date):Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}





export const shortDate = (date:Date):string => {
  return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${zeroPad(date.getFullYear())}`
}





export const zeroPad = (input:number):string => {
  if (input < 10) return `0${input}`
  return `${input}`
}