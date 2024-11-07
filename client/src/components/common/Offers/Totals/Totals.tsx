import { IQuotesData } from "@@/interface/request/quotes"

import style from './Totals.module.scss'
import bodyStyle from '@/components/MainPage/Body/Body.module.scss'





interface ITotals {
  data: IQuotesData
}





const Totals = ({ data }:ITotals) => {
  //data
  const minOffers = data.quotes.reduce((min, day) => Math.min(min, day.offers), data.quotes[0]?.offers || 0)
  const maxOffers = data.quotes.reduce((max, day) => Math.max(max, day.offers), data.quotes[0]?.offers || 0)
  const avgOffers = data.quotes.reduce((total, day) => total + day.offers, 0) / data.quotes.length

  //styles
  const getClass = ():string => {
    if (data.quotes.length) return bodyStyle.fadeIn
    return `opacity-0`
  }

  //return frame
  return (
    <div className={`flex flex-row justify-between mt-2 text-xl ${getClass()}`}>

      <div className="px-4">
        Min:&nbsp;
        <span className={style.offersText}>
          {minOffers.toLocaleString('en')}
        </span>
      </div>

      <div className="px-4">
        Max:&nbsp;
        <span className={style.offersText}>
          {maxOffers.toLocaleString('en')}
        </span>
      </div>

      <div className="px-4">
        Average:&nbsp;
        <span className={style.offersText}>
          {avgOffers.toLocaleString('en', { maximumFractionDigits: 0 })}
        </span>
      </div>

      <div className="px-4">
        (unique sellers)
      </div>

    </div>
  )
}





export default Totals