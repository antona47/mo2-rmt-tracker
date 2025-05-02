import { IPlayerAuctionsEntry, IPlayerAuctionsQuote } from "./interfaces"

import axios from "axios"
import * as cheerio from "cheerio"
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'





export const init = async () => {
  puppeteer.use(StealthPlugin())
}





export const getPage = async (pageNumber:number):Promise<IPlayerAuctionsEntry[]> => {
  const url = `https://www.playerauctions.com/mortal-online-2-gold/reviews/?PageIndex=${pageNumber}`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36')
  await page.setViewport({ width: 1280, height: 800 })

  let results:IPlayerAuctionsEntry[] = []

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForSelector('.body-feedback', { timeout: 30000 })

    const html = await page.content()
    results = parsePage(html)
  } catch (err) {
    console.error('Failed to load the page:', err)
    throw new Error(`PlayerAuctions page ${pageNumber} import failed!`)
  } finally {
    await browser.close()
  }

  return results
}





const parsePage = (html:string):IPlayerAuctionsEntry[] => {
  const $ = cheerio.load(html)

  const results: IPlayerAuctionsEntry[] = []

  //parse entries
  $('.body-feedback > div').each((_, el) => {
    const comment = $(el).find('.feedback-gold p:first-child').text().trim()
    const amount = $(el).find('.feedback-gold p:last-child').text().trim()
    const buyer = $(el).find('.feedback-left-by div:last-child p').text().trim()
    const date = $(el).find('.feedback-comment-date').text().trim()

    results.push({
      comment: trimComment(clean(comment)),
      amount: getGold(clean(amount)),
      buyer: clean(buyer),
      date: getDate(clean(date))
    })
  })

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
  const price = Math.round(result["LowestOfferPrice"]["USD"] * 10000 * 100) //per stack (10k) in cents

  //if response does not contain useful data, sound alarm
  if (typeof offers !== 'number' || typeof price !== 'number') {
    throw new Error(`PlayerAuctions quote received invalid price (${price}) and offers (${offers})`)
  }

  return { price, offers }
}





//FILTERS

const clean = (value:string):string => {
  return value.replaceAll('\n', '').trim()
}


const trimComment = (value:string):string => {
  return value.substring(0, 100)
}


const getGold = (value:string):number => {
  return Number(value.split(' ')[0])
}


const getDate = (value:string):Date => {
  return new Date(value)
}