import env from './env'
import { config } from 'node-config-ts'





export const awaitIfTest = async (fn:Function) => {
  if (env.isTEST) await fn()
  else fn()
}





export const freshSessionTerm = ():Date => {
  return new Date(Date.now() + config.auth.sessionValidDuration)
}





export const delay = async (ms:number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}





export const zeroPad = (input:number):string => {
  if (input < 10) return `0${input}`
  return `${input}`
}