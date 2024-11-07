import { IQuotesData } from "@@/interface/request/quotes"

import style from './Totals.module.scss'
import bodyStyle from '@/components/MainPage/Body/Body.module.scss'





interface ITotals {
  data: IQuotesData
}





const Totals = ({ data }:ITotals) => {
  //data
  const avgPrice = data.quotes.reduce((total, day) => total + day.price, 0) / data.quotes.length

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
        <span className={style.priceText}>
          ${data.minPrice.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="px-4">
        Max:&nbsp;
        <span className={style.priceText}>
          ${data.maxPrice.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="px-4">
        Average:&nbsp;
        <span className={style.priceText}>
          ${avgPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="px-4">
        / 10,000g
      </div>

    </div>
  )
}





export default Totals