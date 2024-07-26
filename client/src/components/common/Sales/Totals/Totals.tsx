import { ISalesData } from "@@/interface/request/sales"

import style from './Totals.module.scss'
import bodyStyle from '@/components/MainPage/Body/Body.module.scss'





interface ITotals {
  sales: ISalesData[]
}





const Totals = ({ sales }:ITotals) => {
  //data
  const totalTransactions = sales.reduce((total, day) => total + day.count, 0)
  const totalGold = sales.reduce((total, day) => total + day.amount, 0)
  const totalFiat = sales.reduce((total, day) => total + day.value, 0)

  //styles
  const getClass = ():string => {
    if (sales.length) return bodyStyle.fadeIn
    return `opacity-0`
  }

  //return frame
  return (
    <div className={`flex flex-row justify-between mt-2 text-xl ${getClass()}`}>

      <div className="px-4">
        <span className={style.transactionsText}>
          {totalTransactions.toLocaleString('en')}
        </span> transactions
      </div>

      <div className="px-4">
        <span className={style.goldText}>
          {totalGold.toLocaleString('en')}
        </span> gold
      </div>

      <div className="px-4">
        <span className={style.fiatText}>
          ${totalFiat.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span> USD
      </div>

    </div>
  )
}





export default Totals