import { useState } from 'react'

import { ISalesData } from '@@/interface/request/sales'

import ModeButton from './ModeButton'
import Totals from './Totals'
import If from '@/components/abstract/If'





interface ISales {
  sales: ISalesData[]
  Chart: any
}





const Sales = ({ sales, Chart }:ISales) => {
  const [salesMode, setSalesMode] = useState<"gold"|"fiat">("gold")

  return (
    <div className="mx-auto mt-16">

      <div className="flex flex-row w-full my-2">
        <ModeButton value="gold" label="Gold" mode={salesMode} setMode={setSalesMode} />
        <ModeButton value="fiat" label="USD" mode={salesMode} setMode={setSalesMode} />
      </div>

      <If condition={sales.length}>
        <Chart mode={salesMode} data={sales} />
        <Totals sales={sales} />
      </If>

      <If condition={!sales.length}>
        <div className="w-full text-center my-8">
          Loading...
        </div>
      </If>

    </div>
  )
}





export default Sales