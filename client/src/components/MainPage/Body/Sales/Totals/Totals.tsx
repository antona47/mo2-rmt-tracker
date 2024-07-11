import { ISalesData } from "@@/interface/request/sales"

import styles from './Totals.module.scss'





interface ITotals {
  sales: ISalesData[]
}





const Totals = ({ sales }:ITotals) => {
  const totalTransactions = sales.reduce((total, day) => total + day.count, 0)
  const totalGold = sales.reduce((total, day) => total + day.amount, 0)
  const totalFiat = sales.reduce((total, day) => total + day.value, 0)

  return (
    <div className="flex flex-row justify-between mt-2 text-xl">

      <div className="px-4">
        {totalTransactions.toLocaleString('en')} transactions
      </div>

      <div className={`px-4 ${styles.goldText}`}>
        {totalGold.toLocaleString('en')} gold
      </div>

      <div className={`px-4 ${styles.fiatText}`}>
        ${totalFiat.toLocaleString('en', { minimumFractionDigits: 2 })} USD
      </div>

    </div>
  )
}





export default Totals