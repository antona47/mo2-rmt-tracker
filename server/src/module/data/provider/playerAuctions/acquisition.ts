import { IPlayerAuctionsEntry, IPlayerAuctionsQuote } from "./interfaces"
import axios from "axios"

const Xray = require('x-ray')





let x:any

export const init = async () => {
  x = Xray({ filters: { clean, getGold, getDate } })
}





export const getPage = async (page:number):Promise<IPlayerAuctionsEntry[]> => {
  const url = `https://www.playerauctions.com/mortal-online-2-gold/reviews/?PageIndex=${page}`

  const results = await x(url, '.body-feedback > div', [{
    comment: '.feedback-gold p:first-child | clean',
    amount: '.feedback-gold p:last-child | clean | getGold',
    buyer: '.feedback-left-by div:last-child p | clean',
    date: '.feedback-comment-date | clean | getDate'
  }]).then().catch((err:any) => { throw err }) as IPlayerAuctionsEntry[]

  //convert date string to date object
  results.forEach((entry) => entry.date = new Date(entry.date))

  //sanity check
  results.forEach((entry) => {
    if (
      typeof entry.comment !== 'string' ||
      typeof entry.amount !== 'number' ||
      typeof entry.buyer !== 'string' ||
      typeof entry.date !== 'object' ||
      entry.amount <= 0
    ) {
      console.error(entry)
      throw new Error(`PlayerAuctions received an improper sale entry!`)
    }
  })

  return results
}





export const getQuote = async():Promise<IPlayerAuctionsQuote> => {
  const url = `https://api-pn.playerauctions.com/markettracker/api/Mortal-Online-2/CurrencyOffer`

  const resp = await axios(url).catch(console.error)

  //if bad response, sound alarm
  if (!resp || !resp.data || !(resp.data["StatusCode"] === 200)) {
    console.error(resp && resp.data)
    throw new Error(`PlayerAuctions quote import received improper response!`)
  }

  const result = resp.data["Result"]
  const offers = result["ActiveOffers"]
  const price = result["LowestOfferPrice"]["USD"] * 10000 * 100 //per stack (10k) in cents

  //if response does not contain useful data, sound alarm
  if (typeof offers !== 'number' || typeof price !== 'number') {
    throw new Error(`PlayerAuctions quote received invalid price (${price}) and offers (${offers})`)
  }

  return { price, offers }
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