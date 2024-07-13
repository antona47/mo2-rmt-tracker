import { IQuotesData } from "@@/interface/request/quotes"

import style from './Totals.module.scss'





interface ITotals {
  quotes: IQuotesData[]
}





const Totals = ({ quotes }:ITotals) => {
  const minPrice = quotes.reduce((min, day) => Math.min(min, day.price), quotes[0]?.price || 0)
  const maxPrice = quotes.reduce((max, day) => Math.max(max, day.price), quotes[0]?.price || 0)
  const avgPrice = quotes.reduce((total, day) => total + day.price, 0) / quotes.length

  return (
    <div className={`flex flex-row justify-between mt-2 text-xl ${style.fadeIn}`}>

      <div className="px-4">
        Min:&nbsp;
        <span className={style.priceText}>
          ${minPrice.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="px-4">
        Max:&nbsp;
        <span className={style.priceText}>
          ${maxPrice.toLocaleString('en', { minimumFractionDigits: 2 })}
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