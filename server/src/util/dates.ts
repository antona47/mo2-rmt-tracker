import Period from "@@/enum/period"

import { endOfMonth, endOfYear, nextSunday, previousMonday, startOfMonth, startOfYear } from "date-fns"
import { zeroPad } from "./misc"

import { config } from "node-config-ts"





interface IDatePayload {
  startDate: Date
  endDate: Date
  period: Period
}





export const restrictDates = (payload:IDatePayload) => {
  //make sure date range isn't negative
  if (payload.endDate < payload.startDate) {
    payload.endDate = payload.startDate
  }

  //limit date range
  if (payload.endDate.getTime() - payload.startDate.getTime() > config.data.exportMaxDateRange) {
    payload.startDate = zeroedDate(new Date(payload.endDate.getTime() - config.data.exportMaxDateRange))
  }
}





export const adjustDatesToPeriod = (payload:IDatePayload) => {
  if (payload.period === Period.WEEK) {
    payload.startDate = previousMonday(payload.startDate)
    payload.endDate = nextSunday(payload.endDate)
  }

  if (payload.period === Period.MONTH) {
    payload.startDate = startOfMonth(payload.startDate)
    payload.endDate = endOfMonth(payload.endDate)
  }

  if (payload.period === Period.YEAR) {
    payload.startDate = startOfYear(payload.startDate)
    payload.endDate = endOfYear(payload.endDate)
  }
}





export const zeroedDate = (date:Date):Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}





export const shortDate = (date:Date):string => {
  return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${date.getFullYear()}`
}





export const shortMonth = (date:Date):string => {
  return `${zeroPad(date.getMonth() + 1)}/${date.getFullYear()}`
}