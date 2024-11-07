import Period from "@@/enum/period"





export const addWhereClause = (condition:string, param:any, where:string[], params:any[]) => {
  params.push(param)
  where.push(`${condition} = $${params.length}`)
}





export const periodMask = (period:Period):string => {
  if (period === Period.DAY) return `YYYY-MM-DD`
  if (period === Period.WEEK) return `YYYY-IW`
  if (period === Period.MONTH) return `YYYY-MM`
  if (period === Period.YEAR) return `YYYY`
}





export const periodSeries = (period:Period):string => {
  if (period === Period.DAY) return `1 day`
  if (period === Period.WEEK) return `1 week`
  if (period === Period.MONTH) return `1 month`
  if (period === Period.YEAR) return `1 year`
}