import { zeroedDate } from "./misc"
import { config } from "node-config-ts"





interface IDatePayload {
  startDate: Date
  endDate: Date
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