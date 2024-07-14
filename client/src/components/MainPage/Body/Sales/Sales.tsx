import { useState } from 'react'

import { ISalesData } from '@@/interface/request/sales'

import ModeButton from '../common/ModeButton'
import Totals from './Totals'
import If from '@/components/abstract/If'





interface ISales {
  sales: ISalesData[]
  loading: boolean
  Chart: any
}





const Sales = ({ sales, loading, Chart }:ISales) => {
  const [salesMode, setSalesMode] = useState("gold")

  return (
    <div className="w-full mt-16">

      <div className="flex flex-row w-full my-2">
        <ModeButton value="gold" label="Gold" mode={salesMode} setMode={setSalesMode} />
        <ModeButton value="fiat" label="USD" mode={salesMode} setMode={setSalesMode} />
      </div>

      <div className="flex w-full h-96 justify-center">

        <If condition={loading}>
          <span className="self-center">
            Loading...
          </span>
        </If>

        <If condition={!loading}>

          <If condition={sales.length}>
            <Chart mode={salesMode} data={sales} />
          </If>

          <If condition={!sales.length}>
            <span className="self-center">
              [no data]
            </span>
          </If>

        </If>

      </div>

      <Totals sales={sales} />

    </div>
  )
}





export default Sales