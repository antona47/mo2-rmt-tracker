import { PlayerAuctionsEntry } from "./interfaces"

const Xray = require('x-ray')





let x:any

export const init = async () => {
  x = Xray({ filters: { clean, getGold, getDate } })
}





export const getPage = async (page:number):Promise<PlayerAuctionsEntry[]> => {
  console.log('getting page', page)
  const url = `https://www.playerauctions.com/mortal-online-2-gold/reviews/?PageIndex=${page}`

  const results = await x(url, '.body-feedback > div', [{
    comment: '.feedback-gold p:first-child | clean',
    amount: '.feedback-gold p:last-child | clean | getGold',
    buyer: '.feedback-left-by div:last-child p | clean',
    date: '.feedback-comment-date | clean | getDate'
  }]).then().catch((err:any) => { throw err })

  //convert date to date object
  results.forEach((entry:any) => entry.date = new Date(entry.date))

  return results as PlayerAuctionsEntry[]
}





//FILTERS

const clean = (value:string):string => {
  return value.replaceAll('\n', '')
}


const getGold = (value:string):number => {
  return Number(value.split(' ')[0])
}


const getDate = (value:string):Date => {
  return new Date(value)
}