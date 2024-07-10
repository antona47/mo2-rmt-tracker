import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ISalesData } from '@@/interface/request/sales'
import { IQuotesData } from '@@/interface/request/quotes'

import If from '@/components/abstract/If'
import GoldTooltip from './Tooltip/GoldTooltip'
import FiatTooltip from './Tooltip/FiatTooltip'





interface IChart {
  mode: "gold" | "fiat"
  sales?: ISalesData[]
  prices?: IQuotesData[]
}





const Chart = ({ mode, sales, prices }:IChart) => {
  //return frame
  return (
    <>

      <If condition={mode === "gold"}>
        <LineChart width={800} height={400} data={sales}>
          <Line type="step" dataKey="amount" stroke="#FFD700" dot={false} />
          <CartesianGrid stroke="#333" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<GoldTooltip />} />
        </LineChart>
      </If>

      <If condition={mode === "fiat"}>
        <LineChart width={800} height={400} data={sales}>
          <Line type="step" dataKey="value" stroke="#51cc45" dot={false} />
          <CartesianGrid stroke="#333" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<FiatTooltip />} />
        </LineChart>
      </If>

    </>
  )
}





export default Chart