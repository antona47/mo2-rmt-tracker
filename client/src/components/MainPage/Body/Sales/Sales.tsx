import { useState } from 'react'

import { ISalesData } from '@@/interface/request/sales'

import ModeButton from './ModeButton'
import Totals from './Totals'





interface ISales {
  sales: ISalesData[]
  Chart: any
}





const Sales = ({ sales, Chart }:ISales) => {
  const [salesMode, setSalesMode] = useState<"gold"|"fiat">("gold")

  return (
    <div className="mx-auto mt-12">
      <div className="flex flex-row w-full my-2">
        <ModeButton value="gold" label="Gold" mode={salesMode} setMode={setSalesMode} />
        <ModeButton value="fiat" label="USD" mode={salesMode} setMode={setSalesMode} />
      </div>
      <Chart mode={salesMode} sales={sales} />
      <Totals sales={sales} />
    </div>
  )
}





export default Sales