import { IQuotesData } from "@@/interface/request/quotes"

import styles from './Totals.module.scss'





interface ITotals {
  quotes: IQuotesData[]
}





const Totals = ({ quotes }:ITotals) => {
  const minOffers = quotes.reduce((min, day) => Math.min(min, day.offers), quotes[0]?.offers || 0)
  const maxOffers = quotes.reduce((max, day) => Math.max(max, day.offers), quotes[0]?.offers || 0)
  const avgOffers = quotes.reduce((total, day) => total + day.offers, 0) / quotes.length

  return (
    <div className="flex flex-row justify-between mt-2 text-xl">

      <div className="px-4">
        Min:&nbsp;
        <span className={styles.offersText}>
          {minOffers.toLocaleString('en')}
        </span>
      </div>

      <div className="px-4">
        Max:&nbsp;
        <span className={styles.offersText}>
          {maxOffers.toLocaleString('en')}
        </span>
      </div>

      <div className="px-4">
        Average:&nbsp;
        <span className={styles.offersText}>
          {avgOffers.toLocaleString('en', { maximumFractionDigits: 0 })}
        </span>
      </div>

    </div>
  )
}





export default Totals