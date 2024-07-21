export const dateString = (date:Date):string => {
  return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${zeroPad(date.getFullYear())} ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`
}





export const zeroPad = (input:number):string => {
  if (input < 10) return `0${input}`
  return `${input}`
}